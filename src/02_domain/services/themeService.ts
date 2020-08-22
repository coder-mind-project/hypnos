import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import IThemeService from '../interfaces/services/IThemeService';
import IUnitOfWork from '../../03_infra/interfaces/IUnitOfWork';
import ITheme from '../interfaces/entities/ITheme';

class ThemeService implements IThemeService {
  private readonly _unitOfWork: IUnitOfWork;

  constructor(app: IExpress) {
    this._unitOfWork = app.get('unitOfWork');
  }

  public async get(skip = 0, limit = 5): Promise<ITheme[]> {
    return await this._unitOfWork.themeRepository.getActiveThemes(skip, limit);
  }
}

export default ThemeService;
