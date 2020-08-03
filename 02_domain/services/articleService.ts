import { Express } from 'express'

class ArticleService {
  _app: any

  constructor(app: Express) {
    this._app = app
  }

  getBoostedArticles(skip: Number = 0, take: Number = 5) {
    return this._app.ServiceLocator.unitOfWork.articleRepository.getBoosted(skip, take)
  }

  getByCustomUri(customUri: String) {
    return this._app.ServiceLocator.unitOfWork.articleRepository.getByCustomUri(customUri, ['boosted', 'published'])
  }

  getRelateds(articleUri: String, limit: Number = 5) {
    return this._app.ServiceLocator.unitOfWork.articleRepository.getRelateds(articleUri, limit)
  }
}

export default ArticleService
