'use client'
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';
import MonthSelector from "@/app/_components/MonthSelector";
// import { useSession } from 'next-auth'


export default function Menu({ month }) {
    // const session = useSession()
    // console.log(session)
    return (
        <div className='w-full h-16 fixed bottom-0 bg-white shadow-lg flex items-center px-10'>
            <MonthSelector month={month} />
            <Link href="/transactions/create" className='z-10 btn-pilled bg-teal-700 w-12 h-12 p-0 flex justify-center items-center absolute -top-[25px] right-10'>
                <FaPlus className="text-lg text-white" />
            </Link>
        </div>
    )
}