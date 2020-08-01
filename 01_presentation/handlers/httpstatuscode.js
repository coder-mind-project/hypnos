class HttpStatusCodeHandler {
  static Configure(express) {
    express.use(HttpStatusCodeHandler.httpStatusCodeErrorHandler)
  }

  static httpStatusCodeErrorHandler(err, req, res, next) {
    res.status(err.statusCode).json(err)
  }
}

module.exports = HttpStatusCodeHandler
