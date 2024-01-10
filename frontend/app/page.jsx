import Link from 'next/link';
import Header from "@/app/_components/Header";
import CardPerDay from "@/app/_components/CardPerDay";
import Menu from "@/app/_components/Menu";
import { IoMdDownload } from "react-icons/io";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaChartPie } from "react-icons/fa";
import { getData } from "@/app/_services/transactions"
import { IDR } from "@/app/_lib/currency";

function isValidDate(dateString) {
  if (!dateString) return false
  let regEx = /^\d{4}-\d{2}$/;
  return dateString.match(regEx) != null;
}

export default async function Home({ searchParams }) {
  let month = isValidDate(searchParams.month) ? searchParams.month : new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0')
  let transactions = []
  let { data, total_pemasukan, total_pengeluaran } = await getData(month)
  transactions = data
  return (
    <>
      <Header>
        <h1 className='text-3xl font-semibold'>Money Writer</h1>
        <div className='flex gap-x-6 items-center'>
          <Link href="/reports">
            <IoMdDownload className='text-3xl' />
          </Link>
          <Link href="/categories">
            <HiOutlineDocumentReport className='text-3xl' />
          </Link>
          <Link href="/chart">
            <FaChartPie className='text-3xl' />
          </Link>
        </div>
      </Header>
      <div className="flex justify-between items-center px-16 bg-slate-50 py-6 border-b-2 border-slate-200">
        <div className='text-center'>
          <h4 className="font-semibold">Pemasukan</h4>
          <p className="text-blue-400">{IDR(total_pemasukan)}</p>
        </div>
        <div className='text-center'>
          <h4 className="font-semibold">Pengeluaran</h4>
          <p className="text-red-400">{IDR(total_pengeluaran)}</p>
        </div>
        <div className='text-center'>
          <h4 className="font-semibold">Saldo</h4>
          <p>{IDR(total_pemasukan - total_pengeluaran)}</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-2 mx-4">
        {transactions.map((transaction_per_day, index) => (
          <CardPerDay key={index} transaction_per_day={transaction_per_day} />
        ))}
      </div>
      <Menu month={month} />
    </>
  )
}
