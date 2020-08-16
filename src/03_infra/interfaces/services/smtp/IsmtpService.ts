import { SentMessageInfo } from 'nodemailer';

interface ISMTPService {
  sendMail(
    from: string,
    to: string,
    subject: string,
    textContent?: string,
    htmlContent?: string
  ): Promise<SentMessageInfo>;
}

export default ISMTPService;
