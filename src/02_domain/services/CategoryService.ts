import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import ICategoryService from '../interfaces/services/ICategoryService';
import IUnitOfWork from '../../03_infra/interfaces/IUnitOfWork';
import ICategory from '../interfaces/entities/ICategory';

class CategoryService implements ICategoryService {
  private readonly _unitOfWork: IUnitOfWork;

  constructor(app: IExpress) {
    this._unitOfWork = app.get('unitOfWork');
  }

  public async getPerTheme(theme: string, skip = 0, limit = 5): Promise<ICategory[]> {
    return await this._unitOfWork.categoryRepository.getByTheme(theme, skip, limit);
  }
}

export default CategoryService;
