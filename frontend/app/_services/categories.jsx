'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

async function getData(jenis_transaksi = 'pengeluaran') {
    const fetch_categories = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories?jenis_transaksi=${jenis_transaksi}`)
    const result = await fetch_categories.json()
    return result.data
}

async function getDataById(id) {
    const fetch_category = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`)
    const result = await fetch_category.json()
    return result.data

}

async function insert(formData) {
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            jenis_transaksi: formData.get('jenis_transaksi')
        }),
    })
    revalidatePath('/categories')
    redirect(`/categories?jenis_transaksi=${formData.get('jenis_transaksi')}`)
}

async function update(formData) {
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories/${formData.get('id')}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.get('name'),
            jenis_transaksi: formData.get('jenis_transaksi')
        }),
    })
    revalidatePath('/categories')
    redirect(`/categories?jenis_transaksi=${formData.get('jenis_transaksi')}`)
}

async function deleteData(formData) {
    let id = formData.get('id')
    await fetch(`${process.env.NEXT_PUBLIC_URL_API}/categories/${id}`, {
        method: 'DELETE',
    })
    revalidatePath('/categories')
}

export { getData, getDataById, insert, update, deleteData }