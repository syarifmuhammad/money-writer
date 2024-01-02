'use client'
import { useRouter } from "next/navigation"
export default function SwitcherTransactionType({jenis_transaksi = 'pengeluaran'}) {
    const router = useRouter()

    function switchTransactionType() {
        router.push(`?jenis_transaksi=${jenis_transaksi == 'pengeluaran' ? 'pemasukan' : 'pengeluaran'}`)
    }
    return (
        <div className="flex items-center">
            <label htmlFor="hs- basic-with-description" className="text-lg text-red-500 me-3">Pengeluaran</label>
            <button onClick={switchTransactionType} type="checkbox" id="hs-basic-with-description" className={
                `relative w-[100px] h-10 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 disabled:opacity-50 disabled:pointer-events-none ${jenis_transaksi == 'pengeluaran' ? 'bg-red-500' : 'bg-green-500'}`
            }>
                <span className={`
                            inline-block h-[calc(100%-10px)] top-[5px] aspect-square bg-white checked:bg-blue-200 absolute rounded-full shadow left-1 transform ring-0 transition ease-in-out duration-200
                            ${jenis_transaksi == 'pengeluaran' ? 'translate-x-0' : 'translate-x-[calc(100px-calc(100%+10px))]'}
                            `}></span>
            </button>
            <label htmlFor="hs-basic-with-description" className="text-lg text-green-500 ms-3">Pemasukan</label>
        </div>
    )
}