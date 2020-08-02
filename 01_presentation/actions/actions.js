const ArticleActions = require('./articleAction')
const ThemeActions = require('./themeAction')

class Actions {
  static configure(express) {
    this.articleActions = new ArticleActions(express)
    this.themeActions = new ThemeActions(express)
  }
}

module.exports = Actions
