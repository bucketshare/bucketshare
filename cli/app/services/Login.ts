export async function login(username: string, password: string) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return await response.json();
}