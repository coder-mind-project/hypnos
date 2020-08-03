import { Express, Request, Response, NextFunction } from 'express'

class ArticleAction {
  _app: any

  constructor(app: Express) {
    const resource = '/articles'
    this._app = app

    this._app.route(`${resource}/boosted`).get(this.getBoosted)

    this._app.route(`${resource}/:customUri/relateds`).get(this.getRelateds)

    this._app.route(`${resource}/:customUri`).get(this.getOne)

    this._app.route(`${resource}/:customUri/comments`).get(async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.json(await this._app.ServiceLocator.commentService.getByArticleUri(req.params.customUri))
      } catch (err) {
        next(err)
      }
    })
  }

  async getBoosted(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this._app.ServiceLocator.articleService.getBoostedArticles(req.query.skip, req.query.take))
    } catch (err) {
      next(err)
    }
  }

  async getRelateds(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this._app.ServiceLocator.articleService.getRelateds(req.params.customUri))
    } catch (err) {
      next(err)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this._app.ServiceLocator.articleService.getByCustomUri(req.params.customUri))
    } catch (err) {
      next(err)
    }
  }

  async postComment(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this._app.ServiceLocator.commentService.saveComment(req.body, req.params.customUri))
    } catch (err) {
      next(err)
    }
  }
}

export default ArticleAction
