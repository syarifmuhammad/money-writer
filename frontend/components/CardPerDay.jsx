
export default function CardPerDay({ date = 'Senin, 20 Nov 2023', transactions = [] }) {
    return (
        <div className="bg-white rounded-md shadow-sm shadow-teal-800/30 lg:px-12 sm:px-6 px-2 py-6">
            <h3 className="text-center text-2xl font-semibold">{date}</h3>
            <div className="flex justify-between px-3">
                <p className="text-blue-400 font-semibold">Rp 0</p>
                <p className="text-red-400 font-semibold">Rp 37.000</p>
            </div>
            <hr className="border-b border-slate-200 my-2" />
            <div className="px-3 flex flex-col gap-y-6 mt-2">
                <div className="flex gap-x-8">
                    <p className="w-5/12">Makanan</p>
                    <p className="w-5/12">Nasi Campur</p>
                    <p className="w-2/12 text-red-400 text-end">Rp 20.000</p>
                </div>
                <div className="flex gap-x-8">
                    <p className="w-5/12">Makanan</p>
                    <p className="w-5/12">Nasi Campur</p>
                    <p className="w-2/12 text-red-400 text-end">Rp 20.000</p>
                </div>
            </div>
        </div>
    )
}