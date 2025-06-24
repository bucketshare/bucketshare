import { Router } from "express";
import passport from "../config/passport";
import { completeOnboarding, googleCallback, localLogin, logout, profile, registerCredentials, testUsername } from "../controllers/auth";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post("/login", localLogin);

router.post('/register', registerCredentials);

router.post('/register/complete', completeOnboarding);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

router.get("/profile", authenticateJWT, profile);

router.post('logout', logout);

router.get('/testUsername/:username', testUsername)

export default router;
