import ArticleRepository from './database/repositories/articleRepository'
import ThemeRepository from './database/repositories/themeRepository'
import CommentRepository from './database/repositories/commentRepository'

import IArticleRepository from './interfaces/repositories/IArticleRepository'
import IThemeRepository from './interfaces/repositories/IThemeRepository'
import ICommentRepository from './interfaces/repositories/ICommentRepository'

class UnitOfWork {
  public articleRepository: IArticleRepository
  public themeRepository: IThemeRepository
  public commentRepository: ICommentRepository

  constructor() {
    this.articleRepository = new ArticleRepository()
    this.themeRepository = new ThemeRepository()
    this.commentRepository = new CommentRepository()
  }
}

export default UnitOfWork
