import { useState } from "react";
import { DotPulse } from 'ldrs/react'
import 'ldrs/react/DotPulse.css'
import { motion } from "framer-motion";
import { login } from "~/services/Login";

const PROVIDERS = [
  {
    name: "Google",
    logo: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
        alt="Google logo"
        className="w-5 h-5"
      />
    ),
    buttonClass:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-200",
    ringClass: "ring-2 ring-blue-400 scale-95",
    onClick: () => alert("Google sign-in clicked!"),
  },
  {
    name: "GitHub",
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    buttonClass:
      "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-400",
    ringClass: "ring-2 ring-gray-400 scale-95",
    onClick: () => alert("GitHub sign-in clicked!"),
  },
];

export function Welcome() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [pressed, setPressed] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const dataa = Object.fromEntries(formData.entries());

    const { loading } = await login(email, password);

    setIsLoggingIn(loading);
    setTimeout(() => setIsLoggingIn(false), 1500);
  };

  const handleProviderClick = (provider: typeof PROVIDERS[0]) => {
    provider.onClick();
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-md p-4 sm:p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-xs sm:max-w-md md:max-w-lg border border-gray-200"
      >
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
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <DotPulse
                  size="32"
                  speed="1.3"
                  color="black"
                />
              </motion.div>
            )}
            {isLoggingIn ? "" : "Login"}
          </button>
        </form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="my-4 sm:my-6 flex items-center"
        >
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 sm:mx-4 text-gray-400 text-xs sm:text-sm">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </motion.div>
        <div className="space-y-2 sm:space-y-3">
          {PROVIDERS.map((provider, idx) => (
            <motion.button
              key={provider.name}
              type="button"
              className={`w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-lg font-semibold shadow transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 ${provider.buttonClass
                } ${pressed === provider.name ? provider.ringClass : ""}`}
              onMouseDown={() => setPressed(provider.name)}
              onMouseUp={() => setPressed(null)}
              onMouseLeave={() => setPressed(null)}
              onClick={() => handleProviderClick(provider)}
              disabled={isLoggingIn}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
            >
              {provider.logo}
              <span className="transition-transform duration-150 text-sm sm:text-base">
                {`Sign in with ${provider.name}`}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
