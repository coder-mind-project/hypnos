import Mail from 'nodemailer/lib/mailer';
import InvalidArgument from '../../../01_presentation/exceptions/InvalidArgument';

class SMTPMail implements Mail.Options {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;

  constructor(from: string, to: string, subject: string, text: string, html: string) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.html = html;
  }

  public validate(): void {
    if (!this.from) throw new InvalidArgument('Emissor de e-mail deve ser informado');

    if (!this.to) throw new InvalidArgument('Receptor de e-mail deve ser informado');

    if (!this.text && !this.html) throw new InvalidArgument('Conteúdo de e-mail deve ser informado');
  }
}

export default SMTPMail;
