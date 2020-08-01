const ServiceLocator = require('../../03_infra/dependencyInjection/serviceLocator')

class ArticleService {
  async getBoostedArticles(skip = 0, take = 5) {
    return ServiceLocator.unitOfWork.articleRepository.getBoosted(skip, take)
  }

  async getByCustomUri(customUri) {
    return ServiceLocator.unitOfWork.articleRepository.getByCustomUri(customUri, ['boosted', 'published'])
  }

  async getPopularArticles(skip = 0, take = 10) {
    return ServiceLocator.unitOfWork.articleRepository.getPopulars(skip, take)
  }

  async getRelateds(articleUri, limit = 5) {
    return ServiceLocator.unitOfWork.articleRepository.getRelateds(articleUri, limit)
  }
}

module.exports = new ArticleService()
