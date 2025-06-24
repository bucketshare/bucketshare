import { RequestHandler, Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { createJWT } from "../config/jwt";
import { validateUser } from "../services/auth";
import { addData, updateData, getOne, checkUsernameExists } from "../services/db";
import { config } from "dotenv";
config();

export const localLogin: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    const user = await validateUser(email, password);

    if (!user.success) {
        res.status(401).json({ message: user.message });
        return;
    }

    const token = createJWT(user.user);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 10,
    });

    res.json({ message: "Login successful" });
};

export const googleCallback: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const user = (req as any).user;

    const token = createJWT(user);

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 10,
    });

    res.redirect(`${process.env.FRONTEND}/home`)
};

export const profile: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    res.json({ message: "Welcome!", user: (req as any).user });
};

export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({ message: "Logged out" });
};

export const registerCredentials: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            res.status(400).json({ message: "Missing credentials" });
            return;
        }

        const passwordhash = await bcrypt.hash(password, 10);

        const userData = {
            email,
            username,
            passwordhash,
            onboardingComplete: false,
            createdAt: new Date().toISOString()
        };

        const userId = await addData("users", userData);

        const { passwordhash: pwdh, ...safeUserData } = userData;
        const token = createJWT(safeUserData);


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 10,
        });

        res.status(201).json({ message: "Credentials saved", userId });
    } catch (err) {
        console.error("Error in registerCredentials:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const completeOnboarding: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, firstname, lastname, isAdult } = req.body;

        if (!userId || !firstname || !lastname || isAdult === undefined) {
            res.status(400).json({ message: "Missing onboarding fields" });
            return;
        }

        const user = await getOne("users", userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        await updateData("users", userId, {
            firstname,
            lastname,
            isAdult,
            onboardingComplete: true,
            bucketlist: {
                name: `${firstname}'s Bucket List`,
                items: [],
                createdAt: new Date().toISOString(),
            },
        });

        res.status(200).json({ message: "Onboarding complete" });
    } catch (err) {
        console.error("Error in completeOnboarding: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const testUsername: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const username = req.params.username;

    if (!username) {
        res.status(400).json({ message: "Username is required" });
        return;
    }

    try {
        const exists = await checkUsernameExists(username as string);
        res.status(200).json({ exists });
    } catch (e) {
        console.error("Error in testUsername: ", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

