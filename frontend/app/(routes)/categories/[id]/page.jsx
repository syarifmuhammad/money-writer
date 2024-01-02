import FormCategory from "@/app/_components/categories/form";
import Header from "@/app/_components/Header";
import SwitcherTransactionType from "@/app/_components/SwitcherTransactionType";
import Link from 'next/link';
import { BiArrowBack } from "react-icons/bi";
import { getDataById } from '@/app/_services/categories';

export default async function Edit({ params, searchParams}) {
    const category = await getDataById(params.id)
    const jenis_transaksi = searchParams.jenis_transaksi ?? category.type
    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Link href={`/categories?jenis_transaksi=${jenis_transaksi}`}>
                        <BiArrowBack className='text-3xl' />
                    </Link>
                    <h1 className='text-3xl font-semibold'>Edit Kategori</h1>
                </div>
            </Header>
            <div className="mt-4 w-full flex justify-center">
               <SwitcherTransactionType jenis_transaksi={jenis_transaksi} />
            </div>
            <FormCategory category={category} jenis_transaksi={jenis_transaksi} />
        </>
    )
}