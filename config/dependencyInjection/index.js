const consign = require('consign')

class ServiceLocator {
  static configure(express) {
    consign()
      .include('/config/validation.js')
      .then('/api/managementHttpResponse.js')
      .then('/api/comments')
      .then('/api/views')
      .then('/api/articles')
      .then('/api/likes')
      .then('/api/messages')
      .then('/api/themes')
      .then('/api')
      .into(express)
  }
}

module.exports = ServiceLocator
