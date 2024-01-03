'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import axios from '@/app/_lib/axiosConfig'

async function getData(month = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0')) {
    const response = await axios.get(`/transactions?month=${month}`)
    return response.data
}

async function getDataById(id) {
    const response = await axios.get(`/transactions/${id}`)
    return response.data.data
}

async function insert(formData) {
    let success = false
    try {
        let payload = {
            date: formData.get('date'),
            amount: formData.get('amount'),
            description: formData.get('description'),
            category_id: formData.get('category_id'),
        }
        await axios.post(`/transactions`, payload)
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

async function update(formData) {
    let success = false
    try {
        await axios.put(`/transactions/${formData.get('id')}`, {
            date: formData.get('date'),
            amount: formData.get('amount'),
            description: formData.get('description'),
            category_id: formData.get('category_id'),
        })
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

async function deleteData(formData) {
    let id = formData.get('id')
    await axios.delete(`/transactions/${id}`)
    revalidatePath('/transactions')
}

export { getData, getDataById, insert, update, deleteData }