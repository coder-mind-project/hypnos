const ArticleRepository = require('./repositories/articleRepository')

class UnitOfWork {
  constructor() {
    this.articleRepository = new ArticleRepository()
  }
}

module.exports = new UnitOfWork()
