import { Request, Response } from "express";
import { EmailTemplates, sendMailWithTemplate } from "../services/emailService";
import config from "../config/config";


export const notify = async (req: Request, res: Response): Promise<void> => {
    const { to, subject, type } = req.body as { to: string, subject: string, type: EmailTemplates };
    let obj = {}

    try {
        if (type == EmailTemplates.ForgotPass)
            obj = { username: to, reset_link: "https://example.com", reset_link_name: "Reset", app_name: config.app_name }
        else
            obj = { user_name: to, finish_auth_url: "https://example.com" }
        await sendMailWithTemplate(to, subject, type, obj)
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send email", error });
    }
}