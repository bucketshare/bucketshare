import { Request, Response } from "express";
import nodemailer from 'nodemailer';
import config from '../config/config';


export const notify = async (req: Request, res: Response): Promise<void> => {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.email,
            pass: config.app_pass,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Bucketlist App" <${config.email}>`,
            to,
            subject,
            text,
        });
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send email", error });
    }
}