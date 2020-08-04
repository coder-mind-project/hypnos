import { Express } from 'express'

import ArticleService from '../../02_domain/services/articleService'
import ThemeService from '../../02_domain/services/themeService'
import CommentService from '../../02_domain/services/commentService'

import UnitOfWork from '../unitOfWork'

class ServiceLocator {
  unitOfWork: UnitOfWork

  articleService: ArticleService
  themeService: ThemeService
  commentService: CommentService

  constructor(express: Express) {
    this.unitOfWork = new UnitOfWork()

    this.articleService = new ArticleService(express)
    this.themeService = new ThemeService(express)
    this.commentService = new CommentService(express)
  }
}

export default ServiceLocator
