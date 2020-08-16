import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import IContactService from '../interfaces/services/IContactService';
import ISMTPService from '../../03_infra/interfaces/services/smtp/IsmtpService';
import { smtp } from '../../03_infra/environments';
import InvalidArgument from '../../01_presentation/exceptions/InvalidArgument';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsvalidators = require('@allanalves23/jsvalidators');

class ContactService implements IContactService {
  private readonly _smtpService: ISMTPService;

  constructor(app: IExpress) {
    this._smtpService = app.get('smtpService');
  }

  private validateContactDetails(readerEmail: string, message: string): void {
    if (!jsvalidators.emailIsValid(readerEmail))
      throw new InvalidArgument('É necessário fornecer um endereço de e-mail válido');

    if (message.length < 20)
      throw new InvalidArgument('É necessário fornecer uma mensagem de contato acima de 20 caracteres');
  }

  public async sendMessage(readerEmail: string, message: string): Promise<unknown> {
    this.validateContactDetails(readerEmail, message);

    return await this._smtpService.sendMail(
      String(smtp.issuer),
      String(smtp.receiver),
      `Contato pelo blog codermind.com.br <${readerEmail}>`,
      message,
      message
    );
  }
}

export default ContactService;
