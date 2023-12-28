'use client'

import FormCategory from "../../../categories/form";
import Header from "@/components/Header";
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useRouter, useSearchParams } from 'next/navigation'

export default function Create() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const jenis_transaksi = searchParams.get('jenis_transaksi') ?? 'pengeluaran'

    function onChangeTypeOfTransaction() {
        if (jenis_transaksi === 'pengeluaran') {
            router.push('/categories/create?jenis_transaksi=pemasukan')
        } else {
            router.push('/categories/create?jenis_transaksi=pengeluaran')
        }
    }

    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Link href="/categories">
                        <Icon className='text-3xl' icon='bx:arrow-back' />
                    </Link>
                    <h1 className='text-3xl font-semibold'>Tambah Kategori</h1>
                </div>
                {/* <Icon icon="bx:plus" className="text-3xl cursor-pointer" /> */}
            </Header>
            <div className="mt-4 w-full flex justify-center">
                <div className="flex items-center mb-4">
                    <label htmlFor="hs- basic-with-description" className="text-lg text-red-500 me-3">Pengeluaran</label>
                    <button type="checkbox" id="hs-basic-with-description" onClick={onChangeTypeOfTransaction} className={
                        `relative w-[100px] h-10 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:pointer-events-none ${jenis_transaksi == 'pengeluaran' ? 'bg-red-500' : 'bg-green-500'}`
                    }>
                        <span className={`
                            inline-block h-[calc(100%-10px)] top-[5px] aspect-square bg-white checked:bg-blue-200 absolute rounded-full shadow left-1 transform ring-0 transition ease-in-out duration-200
                            ${jenis_transaksi == 'pengeluaran' ? 'translate-x-0' : 'translate-x-[calc(100px-calc(100%+10px))]'}
                            `}></span>
                    </button>
                    <label htmlFor="hs-basic-with-description" className="text-lg text-green-500 ms-3">Pemasukan</label>
                </div>
            </div>
            <FormCategory jenis_transaksi={jenis_transaksi} />
        </>
    )
}