'use server'

import axios from '@/app/_lib/axiosConfig'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const handleSignin = async (formData) => {
    const cookieStore = cookies()
    try {
        const res = await axios.post('/login', {
            email: formData.get('email'),
            password: formData.get('password'),
        })
        cookieStore.set('API_TOKEN', res.data.token)
        cookieStore.set('USER_DATA', JSON.parse(res.data.user))

        redirect('/')
    } catch (err) {
        alert("Email atau password salah !")
    }
    
}

export default handleSignin