<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Table Report</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        .pengeluaran {
            color: #f87171;
        }

        .pemasukan {
            color: #60a5fa;
        }

        .total {
            background-color: #0d94884d;
        }
    </style>
</head>

<body>

    <h2>Laporan dari tanggal {{ date('d/m/Y', strtotime($from)) }} - {{ date('d/m/Y', strtotime($until)) }}</h2>

    <table>
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Kategori</th>
                <th>Deskripsi</th>
                <th>Jumlah</th>
            </tr>
        </thead>
        <tbody>
            @php
                $total = 0;
            @endphp
            @foreach ($transactions as $transaction)
                <tr>
                    <td>{{ date('d-m-Y', strtotime($transaction->created_at)) }}</td>
                    <td>{{ $transaction->category->name }}</td>
                    <td>{{ $transaction->description }}</td>
                    <td class="{{ $transaction->category->type }}">Rp {{ number_format($transaction->amount) }}</td>
                </tr>
                @php
                    if ($transaction->category->type == 'pengeluaran') {
                        $total -= $transaction->amount;
                    } else {
                        $total += $transaction->amount;
                    }
                @endphp
            @endforeach
            <tr>
                <td colspan="3" class="total">TOTAL</td>
                <td class="total {{ $total < 0 ? 'pengeluaran' : 'pemasukan' }}">Rp {{ number_format($total) }}</td>
            </tr>
        </tbody>
    </table>

</body>

</html>
