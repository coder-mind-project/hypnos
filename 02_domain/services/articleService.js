const ServiceLocator = require('../../03_infra/dependencyInjection/serviceLocator')

class ArticleService {
  getBoostedArticles(skip = 0, take = 5) {
    return ServiceLocator.unitOfWork.articleRepository.getBoosted(skip, take)
  }

  getByCustomUri(customUri) {
    return ServiceLocator.unitOfWork.articleRepository.getByCustomUri(customUri, ['boosted', 'published'])
  }

  getRelateds(articleUri, limit = 5) {
    return ServiceLocator.unitOfWork.articleRepository.getRelateds(articleUri, limit)
  }
}

module.exports = new ArticleService()
