const ServiceLocator = require('../../03_infra/dependencyInjection/serviceLocator')

class ArticleService {
  get(skip = 0, take = 5) {
    return ServiceLocator.unitOfWork.themeRepository.get(skip, take, { state: 'active' })
  }
}

module.exports = new ArticleService()
