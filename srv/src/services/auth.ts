import { getUserByEmailAndCheckPassword } from "./db";

export const validateUser = async (email: string, password: string) => {
    const user = await getUserByEmailAndCheckPassword(email, password);

    return user;
};
