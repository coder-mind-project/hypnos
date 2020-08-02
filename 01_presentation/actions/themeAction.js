const themeService = require('../../02_domain/services/themeService')

class ThemeAction {
  constructor(app) {
    const resource = '/themes'
    this._app = app

    this._app.route(`${resource}`)
      .get(this.get)
  }

  async get(req, res, next) {
    try {
      res.json(await themeService.get(req.query.skip, req.query.take))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ThemeAction
