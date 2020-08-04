import { Express } from 'express'

class ThemeService {
  _app: any

  constructor(app: Express) {
    this._app = app
  }

  get(skip: Number = 0, take: Number = 5) {
    return this._app.ServiceLocator.unitOfWork.themeRepository.get(skip, take, { state: 'active' })
  }
}

export default ThemeService
