import { DocumentQuery, Document } from 'mongoose'

import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress'
import IThemeService from '../interfaces/services/IThemeService'
import IUnitOfWork from '../../03_infra/interfaces/IUnitOfWork'

class ThemeService implements IThemeService {
  private readonly _unitOfWork: IUnitOfWork

  constructor(app: IExpress) {
    this._unitOfWork = app.get('unitOfWork')
  }

  public get(skip: number = 0, limit: number = 5): DocumentQuery<Document[], Document, {}> {
    return this._unitOfWork.themeRepository.get(skip, limit, { state: 'active' })
  }
}

export default ThemeService
