"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("../config/passport"));
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/login", auth_1.localLogin);
router.post('/register', auth_1.registerCredentials);
router.post('/register/complete', auth_1.completeOnboarding);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { session: false }), auth_1.googleCallback);
router.get("/profile", auth_2.authenticateJWT, auth_1.profile);
router.post('logout', auth_1.logout);
router.get('/testUsername/:username', auth_1.testUsername);
exports.default = router;
