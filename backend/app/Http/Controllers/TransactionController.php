<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionCollection;
use App\Http\Resources\TransactionResource;
use App\Http\Resources\TransactionPerDayResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "month" => "date_format:Y-m"
        ]);

        if ($validator->fails()) {
            $request['month'] = date('Y-m');
        }
        $date = explode('-', $request->month ?? date('Y-m'));
        $month = $date[1];
        $year = $date[0];
        $response = Transaction::select(DB::raw('DATE(created_at) as date'))->where('user_id', auth()->id())->whereYear('created_at', '=', $year)
            ->whereMonth('created_at', '=', $month)->orderBy('created_at')->distinct()->get();

        $total_pemasukan = 0;
        $total_pengeluaran = 0;

        foreach ($response as $key => $value) {
            $transactions = Transaction::where('user_id', auth()->id())->whereDate('created_at', $value->date)->get();
            $response[$key]['transactions'] = $transactions;
            if ($transactions->count() > 0) {
                foreach ($transactions as $transaction) {
                    if ($transaction->category->type == 'pemasukan') {
                        $total_pemasukan += $transaction->amount;
                    } else {
                        $total_pengeluaran += $transaction->amount;
                    }
                }
            }
        }

        return [
            'total_pemasukan' => $total_pemasukan,
            'total_pengeluaran' => $total_pengeluaran,
            'data' => TransactionPerDayResource::collection($response)
        ];
    }

    public function chart(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "month" => "date_format:Y-m"
        ]);

        if ($validator->fails()) {
            $request['month'] = date('Y-m');
        }
        $date = explode('-', $request->month ?? date('Y-m'));
        $month = $date[1];
        $year = $date[0];

        $pengeluaran = Transaction::whereHas('category', function ($query) {
            $query->where('type', 'pengeluaran');
        })->select(DB::raw('SUM(amount) as total'))->where('user_id', auth()->id())->whereYear('created_at', '=', $year)
            ->whereMonth('created_at', '=', $month)->first();

        $pemasukan = Transaction::whereHas('category', function ($query) {
            $query->where('type', 'pemasukan');
        })->select(DB::raw('SUM(amount) as total'))->where('user_id', auth()->id())->whereYear('created_at', '=', $year)
            ->whereMonth('created_at', '=', $month)->first();
        return response()->json([
            'pengeluaran' => $pengeluaran->total ?? 0,
            'pemasukan' => $pemasukan->total ?? 0
        ]);
    }

    public function report(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "from" => "required|date",
            "until" => "required|date|after_or_equal:from",
            "type" => "required|in:semua_jenis,pengeluaran,pemasukan"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validasi form gagal !",
                'errors' => $validator->errors()
            ], 422);
        }

        $transactions = Transaction::whereHas('category', function ($query) use ($request) {
            if ($request->type != 'semua_jenis') {
                $query->where('type', $request->type);
            }
        })->where('user_id', auth()->id())->whereBetween('created_at', [$request->from, $request->until])->get();

        $pdf = PDF::loadView('pdf.transactions_report', ['transactions' => $transactions, 'from' => $request->from, 'until' => $request->until]);

        $nama_file = date('d-m-Y', strtotime($request->from)) . ' s.d ' . date('d-m-Y', strtotime($request->until));
        return $pdf->download("$nama_file.pdf");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date_format:Y-m-d',
            'amount' => 'required',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validasi form gagal !",
                'errors' => $validator->errors()
            ], 422);
        }

        $category = Category::find($request->category_id);
        $transaction = new Transaction();
        $transaction->amount = $request->amount;
        $transaction->description = $request->description ?? "";
        $transaction->category_id = $category->id;
        $transaction->user_id = auth()->id();
        $transaction->created_at = $request->date;
        $transaction->save();

        return response()->json([
            'message' => 'Transaction created successfully',
            'data' => new TransactionResource($transaction)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transaction = Transaction::where('user_id', auth()->id())->find($id);

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaction not found'
            ], 404);
        }

        return new TransactionResource($transaction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'date' => "required|date_format:Y-m-d",
            'amount' => 'required',
            'description' => 'string',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validasi form gagal !",
                'errors' => $validator->errors()
            ], 422);
        }

        $transaction = Transaction::where('user_id', auth()->id())->find($id);

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaction not found'
            ], 404);
        }

        $category = Category::find($request->category_id);
        $transaction->amount = $request->amount;
        $transaction->description = $request->description;
        $transaction->category_id = $category->id;
        $transaction->user_id = 1;
        $transaction->created_at = $request->date;
        $transaction->save();

        return response()->json([
            'message' => 'Transaction updated successfully',
            'data' => new TransactionResource($transaction)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::where('user_id', auth()->id())->find($id);

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaction not found'
            ], 404);
        }

        $transaction->delete();

        return response()->json([
            'message' => 'Transaction deleted successfully'
        ]);
    }
}
