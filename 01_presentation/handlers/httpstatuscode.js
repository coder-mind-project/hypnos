const Logger = require('../../03_infra/services/log')

class HttpStatusCodeHandler {
  static Configure(express) {
    express.use(HttpStatusCodeHandler.httpStatusCodeErrorHandler)
  }

  static httpStatusCodeErrorHandler(err, req, res, next) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err)
    } else {
      Logger.print(err.stack || err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

module.exports = HttpStatusCodeHandler
