"use client"
import { useState } from "react"
import { login } from "../services/Login"
import Image from "next/image"

export default function Login() {
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [pressed, setPressed] = useState<string | null>(null)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const req = login(email, password)

        if (req.status === "success") {
            setIsLoggingIn(false)
        } else if (req.status === "error") {
            throw new Error(req.error.message)
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-2 sm:px-4">
            <div className="bg-white/80 backdrop-blur-md p-4 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg border border-gray-200">
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-indigo-700 tracking-tight transition-colors duration-500">
                    Login
                </h1>
                <form className="space-y-4 sm:space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label
                            className="block text-gray-600 mb-1 sm:mb-2 font-medium text-sm sm:text-base"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 transition-all duration-300 text-sm sm:text-base"
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            autoComplete="email"
                            disabled={isLoggingIn}
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-600 mb-1 sm:mb-2 font-medium text-sm sm:text-base"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 transition-all duration-300 text-sm sm:text-base"
                            type="password"
                            id="password"
                            placeholder="********"
                            autoComplete="current-password"
                            disabled={isLoggingIn}
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="text-right mt-1 sm:mt-2">
                            <a
                                href="/forgotpassword"
                                className="text-xs sm:text-sm text-indigo-600 hover:underline focus:underline transition-colors duration-200"
                                tabIndex={isLoggingIn ? -1 : 0}
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 sm:py-2.5 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${isLoggingIn ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        disabled={isLoggingIn}
                    >
                        {isLoggingIn && (
                            <div>
                            </div>
                        )}
                        {isLoggingIn ? "" : "Login"}
                    </button>
                </form>

                <div className="my-4 sm:my-6 flex items-center">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="mx-2 sm:mx-4 text-gray-400 text-xs sm:text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                <div className="space-y-2 sm:space-y-3">
                    <button
                        type="button"
                        className={`w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-lg font-semibold shadow transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-200 ${pressed === "Google" ? "ring-2 ring-blue-400 scale-95" : ""}`}
                        onMouseDown={() => setPressed("Google")}
                        onMouseUp={() => setPressed(null)}
                        onMouseLeave={() => setPressed(null)}
                        onClick={() => alert("Google sign-in clicked!")}
                        disabled={isLoggingIn}
                    >
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
                            alt="Google logo"
                            className="w-5 h-5"
                        />
                        <span className="text-sm sm:text-base">Sign in with Google</span>
                    </button>

                    <button
                        type="button"
                        className={`w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-lg font-semibold shadow transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-400 ${pressed === "GitHub" ? "ring-2 ring-gray-400 scale-95" : ""}`}
                        onMouseDown={() => setPressed("GitHub")}
                        onMouseUp={() => setPressed(null)}
                        onMouseLeave={() => setPressed(null)}
                        onClick={() => alert("GitHub sign-in clicked!")}
                        disabled={isLoggingIn}
                    >
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                            alt="GitHub logo"
                            className="w-5 h-5 invert"
                        />
                        <span className="text-sm sm:text-base">Sign in with GitHub</span>
                    </button>

                </div>
            </div>
        </main>
    )
}
