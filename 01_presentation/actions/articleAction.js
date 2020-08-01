const articleService = require('../../02_domain/services/articleService')

class ArticleAction {
  constructor(app) {
    this._app = app

    this._app.route('/articles/boosted')
      .get(this.getBoosted)
  }

  getBoosted(req, res) {
    return res.json(articleService.getBoostedArticles())
  }
}

module.exports = ArticleAction
