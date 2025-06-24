import express from 'express'
import handler from './routes/handler';
import AuthRoutes from './routes/auth';
import { config } from 'dotenv'
import passport from './config/passport';
import cookieParser from 'cookie-parser'
import cors from 'cors'

config()
const app = express();

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://accounts.google.com"
    ],
    credentials: true,
}));


app.use(passport.initialize());
app.use(cookieParser());

app.use('/', handler);
app.use("/auth", AuthRoutes);

const PORT = process.env.PORT || "5000"

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
