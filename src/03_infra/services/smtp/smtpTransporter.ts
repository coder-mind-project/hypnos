import SMTPTransport from "nodemailer/lib/smtp-transport";
import { smtp } from '../../environments'

const SMTPTransporter: SMTPTransport.Options = {
    host: smtp.server,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
        user: smtp.user,
        pass: smtp.pass
    }
}

export default SMTPTransporter;