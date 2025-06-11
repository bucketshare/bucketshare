import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    email: string;
    app_pass: string;
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    email: process.env.EMAIL || 'test.noreply@gmail.com',
    app_pass: process.env.APP_PASS || ''
};

export default config;