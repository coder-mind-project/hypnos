const nodemailer = require('nodemailer')

module.exports = app => {

    const { exists, validateEmail, validateLength } = app.config.validation

    const { errorMessages } = app.config.managementHttpResponse

    const { 
        SMTP_SERVER, //Servidor SMTP
        PORT, //Porta
        SECURE, // Definido através da porta
        USER, //Conta para envio de e-mail
        PASSWORD, //Senha da conta para envio de e-mail
        RECEIVER //E-mail recebedor da mensagem do usuário 
    } = app.config.mailer

    const sendMessage = async (req, res) => {
        /*
            Responsável por enviar a mensagem de contato de um usuário
        */
        const user = {...req.body}
        
        try {

            validateEmail(user.email, 'E-mail inválido, verifique se seu e-mail está correto')
            exists(user.message, 'Você precisa digitar uma mensagem/pergunta primeiro')
            validateLength(user.email, 100)
            validateLength(user.message, 1000)

            const configTransport = {
                host: SMTP_SERVER,
                port: PORT,
                secure: SECURE,
                auth: {
                    user: USER,
                    pass: PASSWORD
                }
            }
            
            const transporter = nodemailer.createTransport(configTransport)
            
            const email = {
                from: `"Mensageiro Coder Mind" <${USER}>`,
                to: RECEIVER,
                subject: `MENSAGEM DE CONTATO - CODER MIND | ${user.email}`,
                text: `${user.message}`,
            }
    
            const info = await transporter.sendMail(email)
    
            if(info.messageId) return res.status(200).send('E-mail enviado com sucesso')
            else throw 'Ocorreu um erro ao enviar o e-mail'
        } catch (error) {
            error = await errorMessages(error)  
            return res.status(error.code).send(error.msg)
        }
    }

    return { sendMessage }
}