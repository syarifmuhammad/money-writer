import { Inter } from 'next/font/google'
import '@/assets/css/main.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Money Writer',
  description: 'A simple tool to help you write out money in words.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + ' ' + 'bg-slate-50'}>
          {children}
      </body>
    </html>
  )
}
