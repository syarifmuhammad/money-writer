import Header from "@/app/_components/Header";
import Link from 'next/link'
import { getData } from "@/app/_services/categories.jsx";
import ListOfCategory from "@/app/_components/ListOfCategory";
import SwitcherTransactionType from "@/app/_components/SwitcherTransactionType";
import { BiArrowBack, BiPlus } from "react-icons/bi";

export default async function Categories(props) {
    let params = props.searchParams
    const jenis_transaksi = params.jenis_transaksi ?? 'pengeluaran'

    let categories = []

    categories = await getData(jenis_transaksi)
    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Link href="/">
                        <BiArrowBack className='text-3xl' />
                    </Link>
                    <h1 className='text-3xl font-semibold'>Kategori</h1>
                </div>
                <Link href={`/categories/create?jenis_transaksi=${jenis_transaksi}`}>
                    <BiPlus className="text-3xl cursor-pointer" />
                </Link>
            </Header>
            <div className="mt-4 w-full flex justify-center">
                <SwitcherTransactionType jenis_transaksi={jenis_transaksi} />
            </div>
            <div className="px-10">
                <ListOfCategory categories={categories} />
            </div>
        </>
    )
}
