'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import axios from '@/app/_lib/axiosConfig'
import { getServerSession } from "next-auth"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getData(month = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0')) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }
    const response = await axios.get(`/transactions?month=${month}`, headers)
    return response.data
}

export async function getDataById(id) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }
    const response = await axios.get(`/transactions/${id}`, headers)
    return response.data.data
}

export async function chart(month) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }
    const response = await axios.get(`/chart?month=${month}`, headers)
    return response.data
}

export async function insert(formData) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }

    let success = false
    try {
        let payload = {
            date: formData.get('date'),
            amount: formData.get('amount'),
            description: formData.get('description'),
            category_id: formData.get('category_id'),
        }
        await axios.post(`/transactions`, payload, headers)
        revalidatePath('/')
        success = true
    } catch (err) {
        console.log(err.response.data)
    } finally {
        if (success) {
            redirect(`/`)
        }
    }
}

export async function update(formData) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }

    let success = false
    try {
        await axios.put(`/transactions/${formData.get('id')}`, {
            date: formData.get('date'),
            amount: formData.get('amount'),
            description: formData.get('description'),
            category_id: formData.get('category_id'),
        }, headers)
        revalidatePath('/transactions')
        success = true
    } catch (err) {
        console.log(err.data)
    } finally {
        if (success) {
            let month = new Date(formData.get('date')).getFullYear() + '-' + (new Date(formData.get('date')).getMonth() + 1).toString().padStart(2, '0')
            redirect(`/?month=${month}`)
        }
    }

}

export async function deleteData(formData) {
    const session = await getServerSession(authOptions)
    let headers = {
        headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`
        }
    }

    let id = formData.get('id')
    await axios.delete(`/transactions/${id}`, headers)
    revalidatePath('/transactions')
}