'use client'

import { useState } from "react";
import Header from "@/components/Header";
import { Icon } from '@iconify/react';
import Link from 'next/link'
import { useRouter, useSearchParams } from "next/navigation";


function CardCategory({ category }) {
    return (
        <div className="flex items-center justify-between gap-y-2 bg-white p-4 shadow-md rounded-md">
            <p>{category.category}</p>
            <Link href="/categories/edit">
                <Icon icon="bx:pencil" className="text-2xl cursor-pointer text-blue-500" />
            </Link>
        </div>
    )
}

function ListOfCategory({ categories }) {
    return (
        <div className="flex flex-col gap-y-2">
            {categories.map((category, index) => (
                <CardCategory key={index} category={category} />
            ))}
        </div>
    )
}


export default function Home() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const jenis_transaksi = searchParams.get('jenis_transaksi')

    const categories = [
        {
            id: 1,
            category: 'Makanan'
        },
        {
            id: 2,
            category: 'Minuman'
        },
        {
            id: 3,
            category: 'Kesehatan'
        },
        {
            id: 4,
            category: 'Olahraga'
        },
        {
            id: 5,
            category: 'Belanja'
        }
    ]

    function onChangeTypeOfTransaction() {
        if (jenis_transaksi === 'pengeluaran') {
            router.push('/categories?jenis_transaksi=pemasukan')
        } else {
            router.push('/categories?jenis_transaksi=pengeluaran')
        }
    }

    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Link href="/">
                        <Icon className='text-3xl' icon='bx:arrow-back' />
                    </Link>
                    <h1 className='text-3xl font-semibold'>Kategori</h1>
                </div>
                <Link href="/categories/create">
                    <Icon icon="bx:plus" className="text-3xl cursor-pointer" />
                </Link>
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
            <div className="px-10">
                <ListOfCategory categories={categories} />
            </div>
        </>
    )
}