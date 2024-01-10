'use server'

import Header from "@/app/_components/Header";
import Link from 'next/link'
import { BiArrowBack } from "react-icons/bi";
import MonthSelector from "@/app/_components/MonthSelector";
import { IDR } from "@/app/_lib/currency";
import Chart from "@/app/_components/Chart"
import { chart } from '@/app/_services/transactions'

function isValidDate(dateString) {
    if (!dateString) return false 
    let regEx = /^\d{4}-\d{2}$/;
    return dateString.match(regEx) != null;
  }

export default async function ChartPage({searchParams}) {
    let month = isValidDate(searchParams?.month) ? searchParams.month : new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0')
    const data_chart = await chart(month)
    console.log(month)
    const series = [parseInt(data_chart.pengeluaran), parseInt(data_chart.pemasukan)]
    const options = {
        chart: {
            id: 'apexchart-example'
        },
        labels: ['Pengeluaran', 'Pemasukan'],
        legend: {
            show: false,
        },
        colors: ['#F87171', '#60A5FA'],
    }

    return (
        <>
            <Header>
                <div className='flex gap-x-12 items-center'>
                    <Link href="/">
                        <BiArrowBack className='text-3xl' />
                    </Link>
                    <h1 className='text-3xl font-semibold'>Grafik</h1>
                </div>
            </Header>
            <div className="mx-4 flex justify-center my-2">
                <MonthSelector month={month} />
            </div>
            <div className="mx-4 flex justify-center items-center min-h-[300px] bg-white rounded-md my-2 shadow-md">
                {series[0] != 0 && series[1] != 0 ? (<Chart options={options} series={series} />) : (<h1>Belum ada transaksi dibulan ini</h1>)}
            </div>
            <div className="w-full bg-white px-6 py-6 border-t flex flex-col gap-y-4">
                <div className="flex justify-between">
                    <div className="flex gap-x-4">
                        <span className="text-red-500">({series[0] + series[1] != 0 ? (series[0] / (series[0]+series[1]) * 100).toFixed(1) : 0}%)</span>
                        <span>Pengeluaran</span>
                    </div>
                    <span className="text-red-500">{IDR(series[0])}</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-x-4">
                        <span className="text-blue-500">({series[0] + series[1] != 0 ? (series[1] / (series[0]+series[1]) * 100).toFixed(1) : 0}%)</span>
                        <span>Pemasukan</span>
                    </div>
                    <span className="text-blue-500">{IDR(series[1])}</span>
                </div>
            </div>
        </>
    )
}
