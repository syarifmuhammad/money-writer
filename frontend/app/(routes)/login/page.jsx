import Link from 'next/link'

export default function Login() {
    return (
        <div className='flex items-center justify-center w-full h-[100vh]'>
            <div className="p-4 sm:p-7 bg-white border border-gray-200 rounded-xl shadow-sm w-[400px]">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Belum mempunyai akun ?  &nbsp;
                        <Link href="/register" className="text-teal-700 decoration-2 hover:underline font-medium">
                            Buat akun disini
                        </Link>
                    </p>
                </div>

                <div className="mt-5">
                    <form>
                        <div className="grid gap-y-4">
                            <div>
                                <label for="email" className="block text-sm mb-2">Email</label>
                                <div className="relative">
                                    <input placeholder="Masukkan email" type="email" id="email" name="email" className="form-control"
                                        autocomplete="username" required />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <label for="password" className="block text-sm mb-2">Password</label>
                                    <a tabindex="-1" className="text-sm text-teal-700 decoration-2 hover:underline font-medium"
                                        href="../examples/html/recover-account.html">Lupa password?</a>
                                </div>
                                <div className="relative">
                                    <input placeholder="Masukkan password" type="password" id="password" name="password"
                                        autocomplete="current-password" className="form-control" required />
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <input tabindex="-1" id="remember-me" type="checkbox"
                                    className="border-gray-200 rounded text-primary-500 focus:ring-primary-500" />
                                <label for="remember-me" className="text-sm">Remember me</label>
                            </div>

                            <button type="submit" className="bg-teal-700 text-white rounded-md text-center justify-center py-3 font-semibold">Sign
                                in</button>
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}