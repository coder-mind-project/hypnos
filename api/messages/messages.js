const nodemailer = require('nodemailer')

module.exports = app => {

    const { exists, validateEmail, validateLength } = app.config.validation

    const { SMTP_SERVER, PORT, SECURE, USER, PASSWORD, RECEIVER } = app.config.mailer
    const sendMessage = async (req, res) => {

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
            let code = 500

            if(typeof error === 'string'){
                switch(error){
                    case 'Você precisa digitar uma mensagem/pergunta primeiro':
                    case 'E-mail inválido, verifique se seu e-mail está correto':{
                        code = 400
                    }
                    default: {
                        if(error.includes('Máximo permitido')){
                            code = 400
                        }
                    }
                }
            }

            return res.status(code).send(error)
        }
    }

    return { sendMessage }
}