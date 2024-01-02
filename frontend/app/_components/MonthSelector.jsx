'use client';

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function MonthSelector({ month = new Date().getFullYear() + "-" + (parseInt(new Date().getMonth()) + 1).toString().padStart(2, "0") }) {
    const router = useRouter()

    function setMonthToParams(val) {
        router.push(`?month=${val}`)
    }

    function increaseMonth(val) {
        let date = new Date(month)
        date.setMonth(date.getMonth() + val)
        setMonthToParams(date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1).toString().padStart(2, "0"))
    }

    return (
        <div className="flex justify-between items-center text-teal-700 gap-x-2">
            <IoIosArrowBack className='cursor-pointer text-2xl' onClick={() => increaseMonth(-1)} />
            <input type="month" className="form-control" value={month} onChange={event => setMonthToParams(event.target.value)} />
            <IoIosArrowForward className='cursor-pointer text-2xl' onClick={() => increaseMonth(1)} />
        </div>
    )
}