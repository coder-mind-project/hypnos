import { Request, Response, NextFunction } from 'express'

import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress'
import IArticleService from '../../02_domain/interfaces/services/IArticleService'
import ICommentService from '../../02_domain/interfaces/services/ICommentService'

import { getNumber } from "../serializers/NumberParser"

class ArticleAction {
  private readonly _app: IExpress
  private readonly _articleService: IArticleService
  private readonly _commentService: ICommentService

  constructor(app: IExpress) {
    const resource = '/articles'

    this._app = app
    this._articleService = app.get('articleService')
    this._commentService = app.get('commentService')

    this._app.route(`${resource}/boosted`).get(this.getBoosted);
    this._app.route(`${resource}/:customUri`).get(this.getOne);
    this._app.route(`${resource}/:customUri/relateds`).get(this.getRelateds);
    this._app.route(`${resource}/:customUri/comments`).get(this.getComments);
  }

  getBoosted = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this._articleService.getBoostedArticles(getNumber(req.query.skip), getNumber(req.query.limit)));
    } catch (err) {
      next(err)
    }
  }

  getRelateds = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this._articleService.getRelateds(req.params.customUri, getNumber(req.query.limit)))
    } catch (err) {
      next(err)
    }
  }

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this._articleService.getByCustomUri(req.params.customUri))
    } catch (err) {
      next(err)
    }
  }

  postComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this._commentService.saveComment(req.body, req.params.customUri))
    } catch (err) {
      next(err)
    }
  }

  getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this._commentService.getByArticleUri(req.params.customUri))
    } catch (err) {
      next(err)
    }
  }
}

export default ArticleAction
