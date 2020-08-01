const articleService = require('../../02_domain/services/articleService')

class ArticleAction {
  constructor(app) {
    const resource = '/articles'
    this._app = app

    this._app.route(`${resource}/boosted`)
      .get(this.getBoosted)

    this._app.route(`${resource}/:customUri`)
      .get(this.getOne)
  }

  async getOne(req, res) {
    return res.json(await articleService.getByCustomUri(req.params.customUri))
  }

  async getBoosted(req, res) {
    return res.json(await articleService.getBoostedArticles(req.query.skip, req.query.take))
  }
}

module.exports = ArticleAction
