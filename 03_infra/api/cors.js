const cors = require('cors')

class Cors {
  allowOrigins(origin, callback) {
    if (process.env.ORIGINS.indexOf(origin) !== -1 || !origin) {
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
