"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwt_1 = require("../config/jwt");
const authenticateJWT = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyJWT)(token);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateJWT = authenticateJWT;
