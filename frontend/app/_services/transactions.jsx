'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function getData(month = new Date().getFullYear() + '-' + (new Date().getMonth() + 1), page = 1) {
    const fetch_transactions = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/transactions?month=${month}`)
    const result = await fetch_transactions.json()
    return result.data
}

async function getDataById(id) {
    const fetch_category = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/transactions/${id}`)
    const result = await fetch_category.json()
    return result.data

}

async function insert(formData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: formData.get('amount'),
                description: formData.get('description'),
                category_id: formData.get('category_id'),
                type: formData.get('jenis_transaksi'),
            }),
        })

        if (!res.ok) {
            switch (res.status) {
                case 400: console.log(await res.json()); break;
                case 401: console.log(await res.json()); break;
                case 404: console.log(await res.json()); break;
                case 500: console.log(await res.json()); break;
            }
        }

        revalidatePath('/')
        redirect(`/`)
    } catch (err) {
        console.log(err)
    }
}

async function update(formData) {
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/transactions/${formData.get('id')}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            jenis_transaksi: formData.get('jenis_transaksi')
        }),
    })
    revalidatePath('/transactions')
    redirect(`/transactions?jenis_transaksi=${formData.get('jenis_transaksi')}`)
}

async function deleteData(formData) {
    let id = formData.get('id')
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/transactions/${id}`, {
        method: 'DELETE',
    })
    revalidatePath('/transactions')
}

export { getData, getDataById, insert, update, deleteData }