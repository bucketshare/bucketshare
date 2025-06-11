import nodemailer from 'nodemailer';
export enum EmailTemplate {
    ForgotPassword = 'forgotPassword',
    ValidateEmail = 'validateEmail'
}

export class Email {
    static getTemplate(template: EmailTemplate, data: { [key: string]: string }): string {
        // Example: fetch templates from a local file or database in real use
        // Here, we define styled templates inline for demonstration

        const styles = `
            <style>
                body { background: #1e293b; color: #f1f5f9; font-family: 'Fira Mono', monospace; padding: 40px; }
                .container { background: #0f172a; border-radius: 16px; box-shadow: 0 4px 24px #0008; max-width: 480px; margin: auto; padding: 32px; }
                h1 { font-size: 2.2rem; margin-bottom: 16px; color: #38bdf8; letter-spacing: 2px; }
                p { font-size: 1.1rem; margin: 12px 0; }
                a { color: #fbbf24; text-decoration: none; font-weight: bold; }
                a:hover { text-decoration: underline; }
                .footer { margin-top: 32px; font-size: 0.9rem; color: #64748b; }
                .golf-art { font-family: monospace; color: #22d3ee; font-size: 1.2rem; margin-bottom: 24px; white-space: pre; }
            </style>
        `;

        const golfArt = `
   _   _   _   _   _   _  
 / \\ / \\ / \\ / \\ / \\ / \\ 
( G | O | L | F | ! | ! )
 \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ 
        `;

        switch (template) {
            case 'forgotPassword':
                return `
                    ${styles}
                    <div class="container">
                        <div class="golf-art">${golfArt}</div>
                        <h1>Forgot Password?</h1>
                        <p>Hey ${data.name},</p>
                        <p>Lost your way to the green? Reset your password and get back in the game:</p>
                        <p><a href="${data.resetLink}">Reset Password</a></p>
                        <div class="footer">ParBuddy • Swing easy, swing often.</div>
                    </div>
                `;
            case 'validateEmail':
                return `
                    ${styles}
                    <div class="container">
                        <div class="golf-art">${golfArt}</div>
                        <h1>Validate Your Email</h1>
                        <p>Hi ${data.name},</p>
                        <p>Ready to tee off? Please validate your email to join the club:</p>
                        <p><a href="${data.validationLink}">Validate Email</a></p>
                        <div class="footer">ParBuddy • See you on the fairway!</div>
                    </div>
                `;
            default:
                return '';
        }
    }

    static async send(
        to: string,
        subject: string,
        template: EmailTemplate,
        data: { [key: string]: string }
    ): Promise<void> {
        const html = this.getTemplate(template, data);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'test20203.noreply@gmail.com',
                pass: 'hczs kmlr awwr tots',
            },
        });

        await transporter.sendMail({
            from: '"ParBuddy" <test20203.noreply@gmail.com>',
            to,
            subject,
            html,
        });


        console.log(`Sending email to: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`HTML: ${html}`);
    }
}