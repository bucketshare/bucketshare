
export async function LoginWithGoogle() {

}

export interface Normal {
    message: "Error" | "ok",
    success: boolean,
    error?: {
        email: string,
        password: string,
    }
}

export async function LoginWithNormal(email: string, password: string): Promise<Normal> {
    try {
        // TODO: Create a backend function that is going for that login call
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                message: "Error",
                success: false,
                error: {
                    email: data?.error?.email || "Unknown email error",
                    password: data?.error?.password || "Unknown password error",
                },
            };
        }

        return { message: "ok", success: true };
    } catch (e) {
        console.error("API error", e);
        return {
            message: "Error",
            success: false,
            error: {
                email: "Server error. Please try again later.",
                password: "",
            },
        };
    }
}
