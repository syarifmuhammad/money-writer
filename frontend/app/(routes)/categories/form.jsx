
export default function Form({ children, title = 'Form', jenis_transaksi = 'pengeluaran', onSubmit }) {
    const submit = async (e) => {
        e.preventDefault()
        const data = {
            name: e.target[0].value,
            jenis_transaksi: jenis_transaksi
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })

        const result = await res.json()
        onSubmit(result)
    }
    return (
        <div className="px-10">
            <form onSubmit={submit} className="p-5 bg-white rounded-md shadow-md">
                <div>
                    <label htmlFor="category">Nama Kategori</label>
                    <input className="form-control" type="text" />
                </div>
                <button className="btn bg-blue-500 mt-4">Simpan</button>
            </form>
        </div>
    )
}