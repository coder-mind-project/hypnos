import ArticleRepository from './database/repositories/articleRepository'
import ThemeRepository from './database/repositories/themeRepository'
import CommentRepository from './database/repositories/commentRepository'
import ViewRepository from './database/repositories/viewRepository'

import IArticleRepository from './interfaces/repositories/IArticleRepository'
import IThemeRepository from './interfaces/repositories/IThemeRepository'
import ICommentRepository from './interfaces/repositories/ICommentRepository'
import IViewRepository from './interfaces/repositories/IViewRepository'

class UnitOfWork {
  public articleRepository: IArticleRepository
  public themeRepository: IThemeRepository
  public commentRepository: ICommentRepository
  public viewRepository: IViewRepository

  constructor() {
    this.articleRepository = new ArticleRepository()
    this.themeRepository = new ThemeRepository()
    this.commentRepository = new CommentRepository()
    this.viewRepository = new ViewRepository()
  }
}

export default UnitOfWork
