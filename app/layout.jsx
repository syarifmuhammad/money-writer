import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Money Writer',
  description: 'A simple tool to help you write out money in words.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' ' + 'bg-slate-50'}>
        <Header></Header>

        {children}
      </body>
    </html>
  )
}
