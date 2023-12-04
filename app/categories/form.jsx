
export default function Form({ children, title = 'Form', jenis_transaksi = 'pengeluaran' }) {
    return (
        <div className="px-10">
            <form className="p-5 bg-white rounded-md shadow-md">
                <div>
                    <label htmlFor="category">Nama Kategori</label>
                    <input className="form-control" type="text" />
                </div>
                <button className="btn bg-blue-500 mt-4">Simpan</button>
            </form>
        </div>
    )
}