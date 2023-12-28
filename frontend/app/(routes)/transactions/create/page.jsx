'use client'
import { useState, useEffect } from "react";
import Header from "@/app/_components/Header";
import { Icon } from '@iconify/react';


export default function Home() {

    const [isPengeluaran, setIsPengeluaran] = useState(true)

    const onChangeTypeOfTransaction = () => {
        setIsPengeluaran(!isPengeluaran)
    }

    useEffect(() => { import('preline') }, [])
    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Icon className='text-3xl' icon='bx:arrow-back' />
                    <h1 className='text-3xl font-semibold'>Tambah Transaksi</h1>
                </div>
            </Header>
            <div className="mt-4 w-full flex justify-center">
                <div className="flex items-center mb-4">
                    <label htmlFor="hs-basic-with-description" className="text-lg text-red-500 me-3">Pengeluaran</label>
                    <button type="checkbox" id="hs-basic-with-description" onClick={onChangeTypeOfTransaction} className={
                        `relative w-[100px] h-10 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:pointer-events-none ${isPengeluaran ? 'bg-red-500' : 'bg-green-500'}`
                    }>
                        <span className={`
                            inline-block h-[calc(100%-10px)] top-[5px] aspect-square bg-white checked:bg-blue-200 absolute rounded-full shadow left-1 transform ring-0 transition ease-in-out duration-200
                            ${isPengeluaran ? 'translate-x-0' : 'translate-x-[calc(100px-calc(100%+10px))]'}
                            `}></span>
                    </button>
                    <label htmlFor="hs-basic-with-description" className="text-lg text-green-500 ms-3">Pemasukan</label>
                </div>
            </div>
            <form className="px-10">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                    <input type="date" className="form-control" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Kategori</label>
                    <select className="form-control">
                        <option value="1">Makanan</option>
                        <option value="2">Minuman</option>
                        <option value="3">Kesehatan</option>
                        <option value="4">Olahraga</option>
                        <option value="5">Belanja</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Harga</label>
                    <input type="number" className="form-control" value='0' />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Keterangan</label>
                    <textarea className="form-control"></textarea>
                </div>
                <div>
                    <button className="btn bg-teal-700 hover:bg-teal-800">Simpan</button>
                </div>
            </form>
        </>
    )
}
