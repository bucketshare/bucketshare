import { Normal } from "./Login";

export async function createNewUser(email: string, password: string, username: string): Promise<Normal> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password, username
            })
        });

        if (!res.ok) {
            if (res.status === 400) {
                return { message: 'Error', success: false, error: { email: 'invalid data', password: 'invalid data' } }
            }
        }

    } catch (e) {
        console.error(e)
        return { message: 'Error', success: false, error: { email: 'Failed to Fetch Server Error', password: '' } }
    }

    return { message: "ok", success: true };
}

export async function testUsername(username: string): Promise<boolean> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/testUsername/${username}`, {
        method: "GET",
    })

    const data = await res.json();
    if (res.ok) {
        return data?.exists ? true : false;
    } else {
        console.error(data);
        return true;
    }
}