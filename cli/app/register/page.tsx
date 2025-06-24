"use client"
import { useEffect, useState } from "react";
import Button from "./../components/Button";
import Input from "./../components/Input";
import Title from "./../components/Title";
import Link from "next/link";
import { createNewUser, testUsername } from "../utils/Register";
import { redirect } from "next/navigation";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    async function Register() {
        setEmailError('');
        setPasswordError('');
        setUsernameError('');
        setIsLoading(true);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Not a valid Email');
            setIsLoading(false);
            return;
        }

        if (!/^.{6,}$/.test(password)) {
            setPasswordError('Password must have at least 6 characters');
            setIsLoading(false);
            return;
        }

        const res = await createNewUser(email, password, username);

        if (!res.success && res.error) {
            setEmailError(res.error.email);
            setPasswordError(res.error.password);
        } else if (res.success) {
            redirect('/onboarding');
        }

        setIsLoading(false);
    }


    useEffect(() => {
        const timeout = setTimeout(() => {
            setPasswordsMatch(password === confirmPassword);
        }, 500);

        return () => clearTimeout(timeout);
    }, [password, confirmPassword]);

    useEffect(() => {
        if (!username) {
            setUsernameError("");
            return;
        }

        setUsernameError("");

        const delayDebounce = setTimeout(async () => {
            try {
                const exists = await testUsername(username);
                if (exists) {
                    setUsernameError("Username already exists, please try another");
                } else {
                    setUsernameError("");
                }
            } catch (er) {
                setUsernameError("Error checking username");
                console.error(er);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [username]);


    return (
        <main>
            <div aria-hidden="false" className="min-dvh flex flex-col justify-start items-center px-6 pt-10 space-y-6">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                    <Title title="Buckett" />

                    <h1 className="text-center font-bold text-3xl sm:text-4xl mt-1">Welcome</h1>

                    <div className="w-full space-y-4 mt-6">
                        <Input placeholder="Username" className="w-full" type="email" autoComplete="username" error={usernameError}
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        />
                        <Input placeholder="Email" className="w-full" type="email" autoComplete="email" error={emailError}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <Input placeholder="Password" type="password" autoComplete="new-password" className={`w-full ${!passwordsMatch ? 'border-red-500 focus:ring-red-400' : ''}`} error={passwordError}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <Input placeholder="Confirm Password" type="password" autoComplete="new-password" className={`w-full ${!passwordsMatch ? 'border-red-500 focus:ring-red-400' : ''}`}
                            error={passwordError}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                        {!passwordsMatch ? (
                            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                        ) : (<div className="mt-1 relative h-[15px] mb-4"></div>)}

                        <Button label="Sign Up" variant="normal" loading={isLoading} onClick={Register} />
                    </div>

                    <div className="pt-8 text-sm text-center text-gray-500">
                        Already have an account?{' '}
                        <Link href="/" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
