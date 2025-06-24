"use client"
import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Title from "./components/Title";
import Image from "next/image";
import { LoginWithNormal } from "./utils/Login";
import Link from "next/link";

export default function Home() {
  const [isLoginNormal, setIsLoginNormal] = useState(false)
  const [isGoogleLogin, setIsGoogleLogin] = useState(false)
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function LoginNormal() {
    setIsLoginNormal(true);
    setEmailError('');
    setPasswordError('');

    const res = await LoginWithNormal(email, password);

    if (res.message === "Error" && res.error) {
      setEmail('');
      setPassword('');
      setEmailError(res.error.email);
      setPasswordError(res.error.password);
    } else {
      console.log("Login success", res);
    }

    setIsLoginNormal(false);
  }


  async function LoginGoogle() {
    setIsGoogleLogin(true);

    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND}/auth/google`;
  }

  return (
    <main>
      <div aria-hidden="false" className="min-dvh flex flex-col justify-start items-center px-6 pt-10 space-y-6">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <Title title="Buckett" />

          <h1 className="text-center font-bold text-3xl sm:text-4xl mt-1">Welcome</h1>

          <div className="w-full space-y-4 mt-6">
            <Input placeholder="Email" className="w-full" type="email" autoComplete="email" error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input placeholder="Password" type="password" autoComplete="current-password" className="w-full" error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className="text-sm text-right">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>


            <Button label="Log In" variant="normal" loading={isLoginNormal} onClick={LoginNormal} />


            <div className="flex items-center justify-center">
              <span className="text-sm text-gray-500">Or</span>
            </div>

            <Button label="Continue with Google" icon={
              <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" width={25} height={25} alt="Google Icon" />
            } variant="extra" loading={isGoogleLogin} onClick={LoginGoogle} />
          </div>

          <div className="pt-8 text-sm text-center text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
