const articleService = require('../../02_domain/services/articleService')

class ArticleAction {
  constructor(app) {
    const resource = '/articles'
    this._app = app

    this._app.route(`${resource}/boosted`)
      .get(this.getBoosted)

    this._app.route(`${resource}/:customUri/relateds`)
      .get(this.getRelateds)

    this._app.route(`${resource}/:customUri`)
      .get(this.getOne)
  }

  async getBoosted(req, res, next) {
    try {
      res.json(await articleService.getBoostedArticles(req.query.skip, req.query.take))
    } catch (err) {
      next(err)
    }
  }

  async getRelateds(req, res, next) {
    try {
      res.json(await articleService.getRelateds(req.params.customUri))
    } catch (err) {
      next(err)
    }
  }

  async getOne(req, res, next) {
    try {
      res.json(await articleService.getByCustomUri(req.params.customUri))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ArticleAction
