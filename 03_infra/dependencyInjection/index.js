const consign = require('consign')

class ServiceLocator {
  static configure(express) {
    consign()
      .include('/03_infra/validation.js')
      .then('/api/managementHttpResponse.js')
      .then('/api/comments')
      .then('/api/views')
      .then('/api/likes')
      .then('/api/messages')
      .then('/api/themes')
      .then('/api/themes')
      .into(express)
  }
}

module.exports = ServiceLocator
