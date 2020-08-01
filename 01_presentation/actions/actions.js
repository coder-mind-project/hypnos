const ArticleActions = require('./articleAction')

class Actions {
  static configure(express) {
    this.articleActions = new ArticleActions(express)
  }
}

module.exports = Actions
