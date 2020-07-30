const DI = require('../dependencyInjection')
const Database = require('../database')

class Services {
  static configure(express) {
    Database.connect()
    DI.configure(express)
  }

  static configurePublicResources(express, path = '/public') {
    express().use(path, express.static('public'))
  }

  static start(express, port = 3010, host = '0.0.0.0') {
    express.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`server running at port ${port}`)
    })
  }
}

module.exports = Services
