export async function LoginWithGoogle() {

}

export interface Normal {
    message: string,
    error?: {
        email: string,
        password: string,
    }
}

export async function LoginWithNormal(email: string, password: string): Promise<Normal> {
    try {
        // TODO: Create a backend function that is going for that login call
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                message: "Error",
                error: {
                    email: data?.error?.email || "Unknown email error",
                    password: data?.error?.password || "Unknown password error",
                },
            };
        }

        return { message: "OK" };
    } catch (e) {
        console.error("API error", e);
        return {
            message: "Error",
            error: {
                email: "Server error. Please try again later.",
                password: "",
            },
        };
    }
}
