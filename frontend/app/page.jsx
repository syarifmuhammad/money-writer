import Link from 'next/link';
import Header from "@/app/_components/Header";
import CardPerDay from "@/app/_components/CardPerDay";
import Menu from "@/app/_components/Menu";
import { IoMdDownload } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaChartPie } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Header>
        <h1 className='text-3xl font-semibold'>Money Writer</h1>
        <div className='flex gap-x-6 items-center'>
          <IoMdDownload className='text-3xl' />
          <Link href="/categories">
            <HiOutlineDocumentReport className='text-3xl' />
          </Link>
          <FaChartPie className='text-3xl' />
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
