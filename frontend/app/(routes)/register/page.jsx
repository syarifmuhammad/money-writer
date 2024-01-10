'use client'

import Link from 'next/link'
import { register } from '@/app/_services/authentication'
import { useFormState } from 'react-dom'

export default function Login() {
    const [state, registerAction] = useFormState(register, {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    return (
        <div className='flex items-center justify-center w-full h-[100vh]'>
            <div className="p-4 sm:p-7 bg-white border border-gray-200 rounded-xl shadow-sm w-[400px]">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Sudah mempunyai akun ?  &nbsp;
                        <Link href="/login" className="text-teal-700 decoration-2 hover:underline font-medium">
                            Login disini
                        </Link>
                    </p>
                </div>

                <div className="mt-5">
                    <form action={registerAction}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm mb-2">Nama</label>
                                <div className="relative">
                                    <input placeholder="Masukkan nama" type="text" id="name" name="name" className="form-control"
                                        autoComplete="name" required />
                                </div>
                                {state.name ?? (<p class="text-xs text-red-600 mt-2">{state.name}</p>)}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">Email</label>
                                <div className="relative">
                                    <input placeholder="Masukkan email" type="email" id="email" name="email" className="form-control"
                                        autoComplete="username" required />
                                </div>
                                {state.email ?? (<p class="text-xs text-red-600 mt-2">{state.email}</p>)}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                <div className="relative">
                                    <input placeholder="Masukkan password" type="password" id="password" name="password"
                                        autoComplete="current-password" className="form-control" required />
                                </div>
                                {state.password ?? (<p class="text-xs text-red-600 mt-2">{state.password}</p>)}
                            </div>
                            <div>
                                <label htmlFor="confirm_password" className="block text-sm mb-2">Konfirmasi Password</label>
                                <div className="relative">
                                    <input placeholder="Masukkan ulang password" type="password" id="password_confirmation" name="password_confirmation"
                                        autoComplete="current-password" className="form-control" required />
                                </div>
                                {state.password_confirmation ?? (<p class="text-xs text-red-600 mt-2">{state.password_confirmation}</p>)}
                            </div>

                            <button type="submit" className="bg-teal-700 text-white rounded-md text-center justify-center py-3 font-semibold">Sign
                                up</button>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}