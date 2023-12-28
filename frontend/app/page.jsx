'use client'
import { useEffect } from "react";
import Link from 'next/link';
import Header from "@/app/_components/Header";
import CardPerDay from "@/app/_components/CardPerDay";
import Menu from "@/app/_components/Menu";
import { Icon } from '@iconify/react';

export default function Home() {
  useEffect(() => { import('preline') }, [])
  return (
    <>
      <Header>
        <h1 className='text-3xl font-semibold'>Money Writer</h1>
        <div className='flex gap-x-6 items-center'>
          <Icon className='text-3xl' icon='ic:round-download' />
          <Link href="/categories">
            <Icon className='text-3xl' icon='carbon:report' />
          </Link>
          <Icon className='text-3xl' icon='mdi:graph-pie-outline' />
        </div>
      </Header>
      <div className="flex justify-between items-center px-16 bg-slate-50 py-6 border-b-2 border-slate-200">
        <div className='text-center'>
          <h4 className="font-semibold">Pemasukan</h4>
          <p className="text-blue-400">Rp 2.500.000</p>
        </div>
        <div className='text-center'>
          <h4 className="font-semibold">Pengeluaran</h4>
          <p className="text-red-400">Rp 67.000</p>
        </div>
        <div className='text-center'>
          <h4 className="font-semibold">Saldo</h4>
          <p>Rp 2.433.000</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-2 mx-4">
        <CardPerDay />
      </div>
      <Menu />
    </>
  )
}
