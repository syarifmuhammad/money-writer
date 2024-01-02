'use client';

import { useState } from 'react';
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import Link from 'next/link';


export default function Menu({ defaultValue }) {
    const [month, setMonth] = useState(defaultValue ? setMonth(defaultValue) : new Date().getFullYear() + "-" + (parseInt(new Date().getMonth())+1).toString().padStart(2, "0")); 
    function increaseMonth(val) {
        let date = new Date(month)
        date.setMonth(date.getMonth() + val)
        setMonth(date.getFullYear() + "-" + (parseInt(date.getMonth())+1).toString().padStart(2, "0"))
    }

    return (
        <div className='w-full h-16 fixed bottom-0 bg-white shadow-lg flex items-center px-10'>
            <div className="flex justify-between items-center text-teal-700 gap-x-2">
                <BiSolidLeftArrow className='cursor-pointer' onClick={() => increaseMonth(-1)} />
                <input type="month" className="form-control" value={month} onChange={event => setMonth(event.target.value)}  />
                <BiSolidRightArrow className='cursor-pointer' onClick={() => increaseMonth(1)} />
            </div>
            <Link href="/transactions/create" className='z-10 btn-pilled bg-teal-700 w-12 h-12 p-0 flex justify-center items-center absolute -top-[25px] right-10'>
                <FaPlus className="text-lg text-white" />
            </Link>
        </div>
    )
}