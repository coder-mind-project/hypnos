import { Request, Response, NextFunction } from 'express'
import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress'
import ThemeService from '../../02_domain/services/themeService'

class ThemeAction {
  private readonly _app: IExpress
  private readonly _themeService: ThemeService

  constructor(app: IExpress) {
    const resource = '/themes'

    this._app = app
    this._themeService = app.get('themeService')

    this._app.route(`${resource}`).get(this.get)
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(await this._themeService.get(Number(req.query.skip), Number(req.query.take)))
    } catch (err) {
      next(err)
    }
  }
}

export default ThemeAction
