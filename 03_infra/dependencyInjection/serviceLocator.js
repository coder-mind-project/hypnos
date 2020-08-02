class ServiceLocator {
  constructor () {
    this.unitOfWork = require('../unitOfWork')
  }
}

module.exports = new ServiceLocator()
