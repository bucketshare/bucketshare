import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENTID!,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENTSECRET!,
            callbackURL: "http://localhost:5000/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
            const user = {
                id: profile.id,
                email: profile.emails?.[0].value,
                name: profile.displayName,
                provider: "google",
            };
            done(null, user);
        }
    )
);

export default passport;
