'use client';


export default function Header({ children }) {
  return (
    <header className='w-full h-20 bg-teal-600/30 text-teal-700 flex items-center px-10 justify-between'>
      { children }
    </header>
  )
}