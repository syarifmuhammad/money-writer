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

        redirect('/')
    } catch (err) {
        redirect('/login')
    }
    
}

export default handleSignin