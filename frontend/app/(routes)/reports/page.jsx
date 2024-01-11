'use client'

import Header from "@/app/_components/Header";
import Link from 'next/link';
import { BiArrowBack } from "react-icons/bi";
import axios from '@/app/_lib/axiosConfig'
import { getSession } from "next-auth/react"

export default function ReportPage() {
    async function download(e) {
        e.preventDefault()
        const session = await getSession()
        const data = new FormData(e.target)
        const res = await axios.get('/report', {
            params: { ...Object.fromEntries(data) }, responseType: 'blob', headers: {
                Authorization: `Bearer ${session?.user?.accessToken}`
            }
        })
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        let filename = 'report'
        link.setAttribute('download', `${filename}.pdf`)
        document.body.appendChild(link)
        link.click()
    }

    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Link href='/'>
                        <BiArrowBack className='text-3xl' />
                    </Link>
                    <h1 className='text-3xl font-semibold'>Download Report</h1>
                </div>
            </Header>
            <form className="px-10 mt-4" onSubmit={download}>
                <div className="mb-4 flex gap-x-4 w-full">
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-2">Dari Tanggal</label>
                        <input type="date" name="from" className="form-control" defaultValue={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, "0")}`} />
                    </div>
                    <div className="w-full">
                        <label className="block text-sm font-medium mb-2">Sampai Tanggal</label>
                        <input type="date" name="until" className="form-control" defaultValue={`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, "0")}`} />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Jenis Laporan</label>
                    <select name="type" className="form-control">
                        <option value="semua_jenis">Semua Jenis</option>
                        <option value="pengeluaran">Pengeluaran</option>
                        <option value="pemasukan">Pemasukan</option>
                    </select>
                </div>
                <div>
                    <button className="btn bg-teal-700 hover:bg-teal-800">Download</button>
                </div>
            </form>
        </>
    )
}