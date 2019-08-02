const { smtpUser, smtpPassword } = require('../.env')

module.exports = app => {
    const SMTP_SERVER = 'smtp.umbler.com'
    const PORT = 587
    const SECURE = false

    const USER = smtpUser
    const PASSWORD = smtpPassword

    const RECEIVER = 'awallan259@gmail.com'


    return { SMTP_SERVER, PORT, SECURE, USER, PASSWORD, RECEIVER}
}