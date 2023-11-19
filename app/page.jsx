import CardPerDay from "@/components/CardPerDay";

export default function Home() {
  return (
    <>
      <div className="flex justify-between items-center px-16 bg-slate-50 py-6 border-b-2 border-slate-200">
        <div className='text-center'>
          <h4 className="font-semibold">Pemasukan</h4>
          <p className="text-blue-400">Rp 2.500.000</p>
        </div>
        <div className='text-center'>
          <h4 className="font-semibold">Pengeluaran</h4>
          <p className="text-red-400">Rp 67.000</p>
        </div>
        <div className='text-center'>
          <h4 className="font-semibold">Saldo</h4>
          <p>Rp 2.433.000</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-3 mt-2 mx-4">
      <CardPerDay />
      </div>
    </>
  )
}
