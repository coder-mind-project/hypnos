const consign = require('consign')

class ServiceLocator {
  constructor(express) {
    this._express = express
  }

  configure() {
    consign()
      .include('/config/middlewares.js')
      .then('/config/captcha.js')
      .then('/config/validation.js')
      .then('/config/mailer.js')
      .then('/config/Date.js')
      .then('/api/managementHttpResponse.js')
      .then('/api/comments')
      .then('/api/views')
      .then('/api/articles')
      .then('/api/likes')
      .then('/api/messages')
      .then('/api/themes')
      .then('/api')
      .into(this._express)
  }
}

module.exports = ServiceLocator
