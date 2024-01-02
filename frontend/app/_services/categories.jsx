'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import axios from '@/app/_lib/axiosConfig'

async function getData(jenis_transaksi = 'pengeluaran') {
    const response = await axios.get(`/categories?jenis_transaksi=${jenis_transaksi}`)
    return response.data.data
}

async function getDataById(id) {
    const response = await axios.get(`/categories/${id}`)
    return response.data.data

}

async function insert(formData) {
    let success = false
    try {
        await axios.post(`/categories`, {
            name: formData.get('name'),
            jenis_transaksi: formData.get('jenis_transaksi')
        })
        revalidatePath('/categories')
        success = true
    } catch (err) {
        console.log(err)
    } finally {
        if (success) {
            redirect(`/categories?jenis_transaksi=${formData.get('jenis_transaksi')}`)
        }
    }
}

async function update(formData) {
    let success = false
    try {
        await axios.put(`/categories/${formData.get('id')}`, {
            name: formData.get('name'),
            jenis_transaksi: formData.get('jenis_transaksi')
        })
        revalidatePath('/categories')
        success = true
    } catch (err) {
        console.log(err)
    } finally {
        if (success) {
            redirect(`/categories?jenis_transaksi=${formData.get('jenis_transaksi')}`)
        }
    }
}

async function deleteData(formData) {
    let id = formData.get('id')
    try {
        await axios.delete(`/categories/${id}`)
        revalidatePath('/categories')
    } catch (err) {
        console.log(err)
    }
}

export { getData, getDataById, insert, update, deleteData }