import { Request, Response, NextFunction, Express } from 'express'

class ThemeAction {
  _app: any

  constructor(app: Express) {
    const resource = '/themes'
    this._app = app

    this._app.route(`${resource}`).get(this.get)
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this._app.ServiceLocator.themeService.get(req.query.skip, req.query.take))
    } catch (err) {
      next(err)
    }
  }
}

export default ThemeAction
