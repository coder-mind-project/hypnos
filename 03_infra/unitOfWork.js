const ArticleRepository = require('./database/repositories/articleRepository')

class UnitOfWork {
  constructor() {
    this.articleRepository = new ArticleRepository()
  }
}

module.exports = new UnitOfWork()
