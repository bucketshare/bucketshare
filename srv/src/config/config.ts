import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
    email: string;
    app_pass: string;
    app_name: string;
}

/**
 * Application configuration object.
 *
 * @property {number} port - The port number on which the server will listen. Defaults to 3000 if not specified in the environment variables.
 * @property {string} nodeEnv - The current Node.js environment (e.g., 'development', 'production'). Defaults to 'development'.
 * @property {string} email - The email address used by the application. Defaults to 'test.noreply@gmail.com' if not specified.
 * @property {string} app_pass - The application password, typically used for email authentication. Defaults to an empty string if not specified.
 * @property {string} app_name - The name of the application. Defaults to "Bucketlist".
 */
const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    email: process.env.EMAIL || 'test.noreply@gmail.com',
    app_pass: process.env.APP_PASS || '',
    app_name: "Bucketlist"
};

export default config;