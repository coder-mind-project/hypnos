const express = require('express')
const app = express()

const consign = require('consign')
const mongoose = require('mongoose')

const cors = require('cors')

app.use(cors())

app.mongoose = mongoose
app.express = express

require('./config/db')

consign()
    .include('/config/middlewares.js')
    .then('/config/captcha.js')
    .then('/config/validation.js')
    .then('/config/mailer.js')
    .then('/config/Date.js')
    .then('/config/mongooseModels.js')
    .then('/api/comments')
    .then('/api')
    .then('/config/routes.js')
    .into(app)

const port = 3002

app.listen(port, () => {
    console.log(`server running at port ${port}`)
})