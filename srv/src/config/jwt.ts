import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const createJWT = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const verifyJWT = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
