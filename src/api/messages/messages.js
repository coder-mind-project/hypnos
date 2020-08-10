const nodemailer = require('nodemailer')
const { smtp } = require('../../03_infra/environments')

module.exports = app => {
  const { exists, validateEmail, validateLength } = app['03_infra'].validation

  const { errorMessages } = app.api.managementHttpResponse

  const sendMessage = async (req, res) => {
    /*
            Responsável por enviar a mensagem de contato de um usuário
        */
    const user = { ...req.body }

    try {
      validateEmail(user.email, 'E-mail inválido, verifique se seu e-mail está correto')
      exists(user.message, 'Você precisa digitar uma mensagem/pergunta primeiro')
      validateLength(user.email, 100)
      validateLength(user.message, 1000)

      const configTransport = {
        host: smtp.server,
        port: smtp.port,
        secure: smtp.secure,
        auth: {
          user: smtp.user,
          pass: smtp.pass
        }
      }

      const transporter = nodemailer.createTransport(configTransport)

      const email = {
        from: `"Mensageiro Coder Mind" <${smtp.user}>`,
        to: smtp.receiver,
        subject: `MENSAGEM DE CONTATO - CODER MIND | ${user.email}`,
        text: `${user.message}`
      }

      const info = await transporter.sendMail(email)

      if (info.messageId) return res.status(200).send('E-mail enviado com sucesso')
      else throw 'Ocorreu um erro ao enviar o e-mail'
    } catch (error) {
      error = await errorMessages(error)
      return res.status(error.code).send(error.msg)
    }
  }

  return { sendMessage }
}
