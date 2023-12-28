<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionCollection;
use App\Http\Resources\TransactionResource;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $transactions = Transaction::where('type', $request->jenis_transaksi ? $request->jenis_transaksi : 'pengeluaran')->get();
        // $transactions = Transaction::where('user_id', auth()->user()->id)->orWhere('user_id', null)->get();
        return new TransactionCollection($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'amount' => 'required|number',
            'description' => 'string',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validasi form gagal !",
                'errors' => $validator->errors()
            ]);
        }
        
        $category = Category::find($request->category_id);
        $transaction = new Transaction();
        $transaction->amount = $request->amount;
        $transaction->description = $request->description;
        $transaction->type = $category->type;
        $transaction->category_id = $category->id;
        $transaction->user_id = 1;
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
        $transaction = Transaction::find($id);

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
            'amount' => 'required|number',
            'description' => 'string',
            'category_id' => 'required|exists:categories,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validasi form gagal !",
                'errors' => $validator->errors()
            ]);
        }
        
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaction not found'
            ], 404);
        }

        $category = Category::find($request->category_id);
        $transaction->amount = $request->amount;
        $transaction->description = $request->description;
        $transaction->type = $category->type;
        $transaction->category_id = $category->id;
        $transaction->user_id = 1;
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
        $transaction = Transaction::find($id);

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
