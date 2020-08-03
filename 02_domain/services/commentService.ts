import { Express } from 'express'
import mongoose from 'mongoose'

import ResourceNotFound from '../../01_presentation/exceptions/ResourceNotFound'
import InvalidArgument from '../../01_presentation/exceptions/InvalidArgument'

class CommentService {
  _app: any

  constructor(app: Express) {
    this._app = app
  }

  validate(commentModel: any) {
    if (!commentModel.userName) {
      throw new InvalidArgument('Nome é obrigatório')
    }

    if (!commentModel.userEmail) {
      throw new InvalidArgument('E-mail é obrigatório')
    }

    if (!commentModel.message.trim()) {
      throw new InvalidArgument('Informe um comentário')
    }
  }

  validateArticle(article: any) {
    if (!article) {
      throw new ResourceNotFound('Artigo não encontrado')
    }
  }

  async getByArticleUri(uri: String, skip: Number = 0, take: Number = 15) {
    const article = await this._app.ServiceLocator.articleService.getByCustomUri(uri)
    this.validateArticle(article)

    return this._app.ServiceLocator.unitOfWork.CommentRepository.getByArticle(article._id, skip, take)
  }

  async saveComment(commentModel: any, customUri: String) {
    this.validate(commentModel)

    const article = await this._app.ServiceLocator.articleService.getByCustomUri(customUri)
    this.validateArticle(article)

    commentModel.articleId = article._id

    return this._app.ServiceLocator.unitOfWork.CommentRepository.create(commentModel)
  }
}

export default CommentService
