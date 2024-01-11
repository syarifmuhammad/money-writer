'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import axios from '@/app/_lib/axiosConfig'
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getData(jenis_transaksi = 'pengeluaran') {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }
    const response = await axios.get(`/categories?jenis_transaksi=${jenis_transaksi}`, headers)
    return response.data.data
}

async function getDataById(id) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }

    const response = await axios.get(`/categories/${id}`, headers)
    return response.data.data

}

async function insert(formData) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }

    let success = false
    try {
        await axios.post(`/categories`, {
            name: formData.get('name'),
            jenis_transaksi: formData.get('jenis_transaksi')
        }, headers)
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
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }
    let success = false
    try {
        await axios.put(`/categories/${formData.get('id')}`, {
            name: formData.get('name'),
            jenis_transaksi: formData.get('jenis_transaksi')
        }, headers)
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
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }

    let id = formData.get('id')
    try {
        await axios.delete(`/categories/${id}`, headers)
        revalidatePath('/categories')
    } catch (err) {
        console.log(err)
    }
}

export { getData, getDataById, insert, update, deleteData }