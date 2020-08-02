const bodyParser = require('body-parser')

class Middlewares {
  static configure(express, reqBodySize = 1) {
    express.use(bodyParser.json({ limit: `${reqBodySize}mb` }))
  }
}

module.exports = Middlewares
