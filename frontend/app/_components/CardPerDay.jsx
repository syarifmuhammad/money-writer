import {IDR} from '@/app/_lib/currency';
import { id } from '@/app/_lib/time'
import Link from 'next/link'

export default function CardPerDay({ transaction_per_day: { date, transactions } }) {
    let total_pengeluaran = transactions.reduce((a, b) => a + (b.category.type == 'pengeluaran' ? b.amount : 0), 0)
    let total_pemasukan = transactions.reduce((a, b) => a + (b.category.type == 'pemasukan' ? b.amount : 0), 0)
    return (
        <div className="bg-white rounded-md shadow-sm shadow-teal-800/30 lg:px-12 sm:px-6 px-2 py-6">
            <h3 className="text-center text-2xl font-semibold">{id(date).format('dddd, DD MMM Y')}</h3>
            <div className="flex justify-between px-3">
                <p className="text-blue-400 font-semibold">{IDR(total_pemasukan)}</p>
                <p className="text-red-400 font-semibold">{IDR(total_pengeluaran)}</p>
            </div>
            <hr className="border-b border-slate-200 my-2" />
            <div className="px-3 flex flex-col gap-y mt-2">
                {transactions.map((transaction, index) => (
                    <Link href={`/transactions/${transaction.id}?jenis_transaksi=${transaction.category.type}`} key={index} className="flex gap-x-2 cursor-pointer hover:bg-slate-200 p-4 -mx-3">
                        <p className="w-5/12">{transaction.category.name}</p>
                        <p className="w-5/12">{transaction.description}</p>
                        <p className={`w-2/12 text-end ${transaction.category.type == 'pengeluaran' ? 'text-red-400' : 'text-blue-400'}`}>{IDR(transaction.amount)}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}