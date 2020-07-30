const cors = require('cors')

const whiteList = ['https://codermind.com.br']

const config = {
  origin: (origin, callback) => {
    if (whiteList.indexOf() !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = cors(config)
