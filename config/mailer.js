const { 
    smtpServer,
    smtpPort,
    smtpSecure,
    smtpUser,
    smtpPassword,
    mailReceiver 
} = require('../.env')

module.exports = app => {

    const SMTP_SERVER = smtpServer
    const PORT = smtpPort
    const SECURE = smtpSecure

    const USER = smtpUser
    const PASSWORD = smtpPassword

    const RECEIVER = mailReceiver


    return { SMTP_SERVER, PORT, SECURE, USER, PASSWORD, RECEIVER}
}