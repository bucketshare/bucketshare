// emailService
import nodemailer from "nodemailer";
import config from "../config/config";
import fs from "fs/promises";
import path from "path";

/**
 * Renders a template string by replacing placeholders with corresponding variable values.
 *
 * Placeholders in the template should be in the format `{{key}}`, where `key` corresponds to a property in the `variables` object.
 * If a key is not found in the `variables` object, it will be replaced with an empty string.
 *
 * @param template - The template string containing placeholders in the format `{{key}}`.
 * @param variables - An object mapping placeholder keys to their replacement string values.
 * @returns The rendered string with all placeholders replaced by their corresponding values.
 */
function renderTemplate(template: string, variables: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => variables[key] || "");
}

/**
 * Nodemailer transporter instance configured to use Gmail service.
 *
 * This transporter is used to send emails via Gmail using the provided
 * authentication credentials from the configuration object.
 *
 * @remarks
 * Ensure that `config.email` contains the Gmail address and `config.app_pass`
 * contains the corresponding app password for secure authentication.
 *
 * @see {@link https://nodemailer.com/smtp/ Nodemailer SMTP Transport Documentation}
 */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email,
        pass: config.app_pass,
    },
});

/**
 * Sends an email using the configured transporter.
 *
 * @param to - The recipient's email address.
 * @param subject - The subject line of the email.
 * @param text - The plain text content of the email.
 * @param html - (Optional) The HTML content of the email.
 * @returns A promise that resolves with the information about the sent email.
 * @throws Throws an error if the email fails to send.
 */
export async function sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string
) {
    const mailOptions = {
        from: `"Bucketlist App" <${config.email}>`,
        to,
        subject,
        text,
        ...(html && { html }),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw new Error(`Failed to send email: ${(error as Error).message}`);
    }
}

/**
 * Enum representing the available email templates used in the email service.
 *
 * @remarks
 * Each member corresponds to a specific HTML template file used for sending emails.
 *
 * @enum
 * @property {string} CompleteAuth - Template for completing authentication (`finishauth.html`).
 * @property {string} ForgotPass - Template for password reset (`forgotpassword.html`).
 */
export enum EmailTemplates {
    CompleteAuth = 'finishauth.html',
    ForgotPass = 'forgotpassword.html',
}


/**
 * Sends an email using a template file and provided variables.
 *
 * @param to - The recipient's email address.
 * @param subject - The subject line of the email.
 * @param template - The template file name to use for the email content.
 * @param variables - An object containing key-value pairs to replace in the template.
 * @returns A promise that resolves when the email has been sent.
 */
export async function sendMailWithTemplate(
    to: string,
    subject: string,
    template: EmailTemplates,
    variables: Record<string, string>
) {
    // Adjust the templates directory as needed
    const templatePath = path.join(__dirname, "../assets/templates", template);
    const templateContent = await fs.readFile(templatePath, "utf-8");
    const html = renderTemplate(templateContent, variables);
    const text = html.replace(/<[^>]+>/g, "");
    return sendMail(to, subject, text, html);
}
