import type { Route } from "./+types/forgotpassword";
import ForgotPassword from "../views/forgotpassword";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function forgotpassword() {
    return <ForgotPassword />;
}
