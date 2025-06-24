"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENTID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENTSECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
}, async (_accessToken, _refreshToken, profile, done) => {
    const user = {
        id: profile.id,
        email: profile.emails?.[0].value,
        name: profile.displayName,
        provider: "google",
    };
    done(null, user);
}));
exports.default = passport_1.default;
