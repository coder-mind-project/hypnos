const mongoose = require('mongoose')

//Configuração de referencias de conexão com o banco de dados
const {developement, production} = require('../.env')

/* 
    Altere para 'development' para setar para ambiente de desenvolvimento
    Altere para 'production' para setar para produção
*/
const config = developement

const url = config.local.url
const user = config.local.user
const pass = config.local.pass
const dbName = config.local.dbName

/* Realiza a conexão com o banco do mongoDB */
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName,
    user,
    pass
}).catch(e => {
        const msg = `Error: Connection in database failed. Stack: ${e}`
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
})