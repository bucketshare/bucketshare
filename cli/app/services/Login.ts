type Status =
    | { status: "success"; data: object }
    | { status: "loading" }
    | { status: "error"; error: Error };

export function login(email: string, password: string) {
    return async function () {
        const status: Status = { status: "loading" }
        // TODO: login in this function

        return status
    }
}