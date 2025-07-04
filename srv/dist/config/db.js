"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert({
            projectId: process.env.GOOGLE_PROJECTID,
            clientEmail: process.env.GOOGLE_CLIENTEMAIL,
            privateKey: process.env.GOOGLE_PRIVATEKEY?.replace(/\\n/g, "\n"),
        }),
    });
}
const db = firebase_admin_1.default.firestore();
exports.db = db;
