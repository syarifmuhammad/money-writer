import Header from "@/app/_components/Header";
import SwitcherTransactionType from "@/app/_components/SwitcherTransactionType";
import { getData } from "@/app/_services/categories"
import { insert } from "@/app/_services/transactions"
import Link from 'next/link';
import { BiArrowBack } from "react-icons/bi";

export default async function Home(props) {
    let params = props.searchParams
    const jenis_transaksi = params.jenis_transaksi ?? 'pengeluaran'
    let categories = []

    categories = await getData(jenis_transaksi)

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
            <form className="px-10" action={insert}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                    <input type="date" name="date" className="form-control" defaultValue={`${new Date().getFullYear()}-${(new Date().getMonth()+1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, "0")}`} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <select className="form-control" name="category_id">
                        {categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Harga</label>
                    <input type="number" name="amount" className="form-control" defaultValue='0' />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Keterangan</label>
                    <textarea name="description" className="form-control"></textarea>
                </div>
                <div>
                    <button className="btn bg-teal-700 hover:bg-teal-800">Simpan</button>
                </div>
            </form>
        </>
    )
}
