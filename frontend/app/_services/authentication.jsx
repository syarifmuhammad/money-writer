'use server'

import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'
import axios from '@/app/_lib/axiosConfig'


async function user() {
    return await axios.get(`/user`)
}

async function register(prevState, formData) {
    let success = false
    try {
        await axios.post(`/register`, {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        })
        success = true
    } catch (err) {
        if (err.response.status == 422) {
            Object.entries(err.response.data.errors).forEach(entry => {
                const [key, value] = entry;
                prevState[key] = value[0]
            });
            return prevState
        } else {
            console.log(err)
        }
    } finally {
        if (success) {
            redirect(`/login`)
        }
    }
}

export { register, user }