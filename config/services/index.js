const DI = require('../dependencyInjection')

class Services {
  static configure(express) {
    new DI(express).configure()
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
