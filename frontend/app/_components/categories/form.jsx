
import { insert, update } from '@/app/_services/categories'

export default function Form({ category, jenis_transaksi = 'pengeluaran' }) {

    return (
        <div className="px-10">
            <form action={category?.id ? update : insert} className="p-5 bg-white rounded-md shadow-md">
                <input type="hidden" name="id" value={category?.id ?? ""} />
                <div>
                    <label htmlFor="category">Nama Kategori</label>
                    <input className="form-control" type="text" name="name" defaultValue={category?.name ?? ""} />
                </div>
                <input type="hidden" name="jenis_transaksi" defaultValue={jenis_transaksi} />
                <button className="btn bg-blue-500 mt-4">Simpan</button>
            </form>
        </div>
    )
}