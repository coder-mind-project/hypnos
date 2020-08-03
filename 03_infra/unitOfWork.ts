import ArticleRepository from './database/repositories/articleRepository'
import ThemeRepository from './database/repositories/themeRepository'
import CommentRepository from './database/repositories/commentRepository'

class UnitOfWork {
  articleRepository: ArticleRepository
  themeRepository: ThemeRepository
  commentRepository: CommentRepository

  constructor() {
    this.articleRepository = new ArticleRepository()
    this.themeRepository = new ThemeRepository()
    this.commentRepository = new CommentRepository()
  }
}

export default UnitOfWork
