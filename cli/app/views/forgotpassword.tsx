import { useState } from "react";
import { Email } from '~/services/Email'
import { DotPulse } from 'ldrs/react';
import 'ldrs/react/DotPulse.css';
import { EmailTemplate } from "~/services/Email";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setError(null);
        setTimeout(() => {
            if (email.includes("@")) {
                Email.send(email, "forgot Password", EmailTemplate.ForgotPassword, {
                    name: "idk",
                    resetLink: "http://localhost:1500"
                })
                setSent(true);
            } else {
                setError("Please enter a valid email address.");
            }
            setIsSending(false);
        }, 1500);
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
                <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">
                    Forgot Password
                </h1>
                {sent ? (
                    <div className="text-center space-y-4">
                        <div className="text-2xl">📧</div>
                        <div className="text-indigo-700 font-semibold">
                            Check your email!
                        </div>
                        <div className="text-gray-600">
                            If an account exists for <span className="font-medium">{email}</span>, you’ll receive a password reset link shortly.
                        </div>
                    </div>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                className="block text-gray-600 mb-2 font-medium"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 transition"
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                disabled={isSending}
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="text-red-600 text-sm">{error}</div>
                        )}
                        <button
                            type="submit"
                            className={`w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2.5 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 transition active:scale-95 flex items-center justify-center gap-2 ${isSending ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            disabled={isSending}
                        >
                            {isSending && (
                                <div>
                                    <DotPulse size="43" speed="1.3" color="black" />
                                </div>
                            )}
                            {isSending ? "" : "Send Reset Link"}
                        </button>
                        <div className="text-right mt-2">
                            <a
                                href="/"
                                className="text-sm text-indigo-600 hover:underline focus:underline"
                                tabIndex={isSending ? -1 : 0}
                            >
                                Back to login
                            </a>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}