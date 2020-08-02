const ArticleRepository = require('./database/repositories/articleRepository')
const ThemeRepository = require('./database/repositories/themeRepository')

class UnitOfWork {
  constructor() {
    this.articleRepository = new ArticleRepository()
    this.themeRepository = new ThemeRepository()
  }
}

module.exports = new UnitOfWork()
