export type Status =
    | { status: "success"; data: object }
    | { status: "error"; error: Error };