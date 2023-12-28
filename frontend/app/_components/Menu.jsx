'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';


export default function Menu({ defaultValue }) {
    const [month, setMonth] = useState(defaultValue ? setMonth(defaultValue) : new Date().getFullYear() + "-" + new Date().getMonth()); 

    return (
        <div className='w-full h-16 fixed bottom-0 bg-white shadow-lg flex items-center px-10'>
            <div className="flex justify-between items-center text-teal-700 gap-x-4">
                <Icon icon="bxs:left-arrow" />
                <input type="month" className="form-control" value={month} onChange={event => setMonth(event.target.value)}  />
                <Icon icon="bxs:right-arrow" />
            </div>
            <button className='btn-pilled w-12 h-12 p-0 flex justify-center items-center absolute -top-[25px] right-10'>
                <Icon className="text-2xl" icon="bx:plus" />
            </button>
        </div>
    )
}