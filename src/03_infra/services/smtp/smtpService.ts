import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransporter from './smtpTransporter';
import SMTPMail from './smtpMail';
import ISMTPService from '../../interfaces/services/smtp/IsmtpService';
import ISMTPMessageSent from './IsmtpMessageSent';

class SMTPService implements ISMTPService {
    private _mail: Mail;

    constructor() {
        this._mail = nodemailer.createTransport(SMTPTransporter)
    }

    public async sendMail(
        from: string,
        to: string,
        subject: string,
        textContent?: string,
        htmlContent?: string
    ): Promise<ISMTPMessageSent> {
        const mail: SMTPMail = new SMTPMail(from, to, subject, String(textContent), String(htmlContent));
        mail.validate();

        const messageSent: ISMTPMessageSent = await this._mail.sendMail(mail);
        return messageSent;
    }
}

export default SMTPService