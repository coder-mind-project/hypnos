const express = require('express')
const app = express()
const consign = require('consign')

app.express = express

consign()
  .include('/config/middlewares.js')
  .then('/config/captcha.js')
  .then('/config/validation.js')
  .then('/config/mailer.js')
  .then('/config/managementHttpResponse.js')
  .then('/config/Date.js')
  .then('/api/comments')
  .then('/api/views')
  .then('/api/likes')
  .then('/api')
  .then('/config/routes.js')
  .into(app)

const port = process.env.DEFAULTPORT || 3010

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server running at port ${port}`)
})
