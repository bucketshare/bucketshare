import { Status } from "../types/request"


export function login(email: string, password: string): Status {
    const status: Status = { status: "success", data: { email, password } }
    // TODO: login in this function

    return status
}