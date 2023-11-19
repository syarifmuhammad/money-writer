'use client';


import { Icon } from '@iconify/react';


export default function Header() {
  return (
    <>
      <header className='w-full h-20 bg-teal-600/30 text-teal-900 flex items-center px-10 justify-between'>
        <h1 className='text-3xl font-semibold'>Money Writer</h1>
        <div className='flex gap-x-6 items-center'>
          <Icon className='text-3xl' icon='ic:round-download' />
          <Icon className='text-3xl' icon='carbon:report' />
          <Icon className='text-3xl' icon='mdi:graph-pie-outline' />
        </div>
      </header>
    </>
  )
}