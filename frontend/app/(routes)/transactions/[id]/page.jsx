import Header from "@/app/_components/Header";
import SwitcherTransactionType from "@/app/_components/SwitcherTransactionType";
import { getData } from "@/app/_services/categories"
import { getDataById, update } from "@/app/_services/transactions"
import Link from 'next/link';
import { BiArrowBack } from "react-icons/bi";

export default async function Home({searchParams, params}) {
    const jenis_transaksi = searchParams.jenis_transaksi ?? 'pengeluaran'
    let categories = []

    categories = await getData(jenis_transaksi)

    let transaction = await getDataById(params.id)

    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Link href='/'>
                        <BiArrowBack className='text-3xl' />
                    </Link>
                    <h1 className='text-3xl font-semibold'>Tambah Transaksi</h1>
                </div>
            </Header>
            <div className="mt-4 w-full flex justify-center">
                <SwitcherTransactionType jenis_transaksi={jenis_transaksi} />
            </div>
            <form className="px-10" action={update}>
                <input type="hidden" name="id" value={transaction.id} />
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                    <input type="date" name="date" className="form-control" defaultValue={`${new Date(transaction.created_at).getFullYear()}-${(new Date(transaction.created_at).getMonth()+1).toString().padStart(2, '0')}-${new Date(transaction.created_at).getDate().toString().padStart(2, "0")}`} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <select className="form-control" name="category_id">
                        {categories.map((category, index) => (
                            <option selected={category.id == transaction.category.id} key={index} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Harga</label>
                    <input type="number" name="amount" className="form-control" defaultValue={transaction.amount} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Keterangan</label>
                    <textarea name="description" className="form-control">
                        {transaction.description}
                    </textarea>
                </div>
                <div>
                    <button className="btn bg-teal-700 hover:bg-teal-800">Simpan</button>
                </div>
            </form>
        </>
    )
}
