class ServiceLocator {
  constructor () {
    this.unitOfWork = require('../unitOfWork')
    this.articleService = require('../../02_domain/services/articleService')
  }
}

module.exports = new ServiceLocator()
