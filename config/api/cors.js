const cors = require('cors')

class Cors {
  constructor() {
    this.whiteList = process.env.ORIGINS
  }

  allowOrigins(origin, callback) {
    if (this.whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }

  configure(express) {
    express.use(cors({ origin: this.allowOrigins }))
  }
}

module.exports = new Cors()
