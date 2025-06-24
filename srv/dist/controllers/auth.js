"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testUsername = exports.completeOnboarding = exports.registerCredentials = exports.logout = exports.profile = exports.googleCallback = exports.localLogin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../config/jwt");
const auth_1 = require("../services/auth");
const db_1 = require("../services/db");
const localLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await (0, auth_1.validateUser)(email, password);
    if (!user.success) {
        res.status(401).json({ message: user.message });
        return;
    }
    const token = (0, jwt_1.createJWT)(user.user);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    res.json({ message: "Login successful" });
};
exports.localLogin = localLogin;
const googleCallback = async (req, res) => {
    const user = req.user;
    const token = (0, jwt_1.createJWT)(user);
    // Set cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 10,
    });
    // You could also redirect here instead of JSON if using frontend redirect
    res.json({ message: "Google login successful" });
};
exports.googleCallback = googleCallback;
const profile = async (req, res) => {
    res.json({ message: "Welcome!", user: req.user });
};
exports.profile = profile;
const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({ message: "Logged out" });
};
exports.logout = logout;
const registerCredentials = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            res.status(400).json({ message: "Missing credentials" });
            return;
        }
        const passwordhash = await bcryptjs_1.default.hash(password, 10);
        const userData = {
            email,
            username,
            passwordhash,
            onboardingComplete: false,
            createdAt: new Date().toISOString()
        };
        const userId = await (0, db_1.addData)("users", userData);
        const { passwordhash: pwdh, ...safeUserData } = userData;
        const token = (0, jwt_1.createJWT)(safeUserData);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 10,
        });
        res.status(201).json({ message: "Credentials saved", userId });
    }
    catch (err) {
        console.error("Error in registerCredentials:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.registerCredentials = registerCredentials;
const completeOnboarding = async (req, res) => {
    try {
        const { userId, firstname, lastname, isAdult } = req.body;
        if (!userId || !firstname || !lastname || isAdult === undefined) {
            res.status(400).json({ message: "Missing onboarding fields" });
            return;
        }
        const user = await (0, db_1.getOne)("users", userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await (0, db_1.updateData)("users", userId, {
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
    }
    catch (err) {
        console.error("Error in completeOnboarding: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.completeOnboarding = completeOnboarding;
const testUsername = async (req, res) => {
    const username = req.params.username;
    if (!username) {
        res.status(400).json({ message: "Username is required" });
        return;
    }
    try {
        const exists = await (0, db_1.checkUsernameExists)(username);
        res.status(200).json({ exists });
    }
    catch (e) {
        console.error("Error in testUsername: ", e);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.testUsername = testUsername;
