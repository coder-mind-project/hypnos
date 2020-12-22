import { Request, Response, NextFunction } from 'express';
import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import ICategoryService from '../../02_domain/interfaces/services/ICategoryService';
import { getNumber } from '../serializers/NumberParser';
import ICategory from '../../02_domain/interfaces/entities/ICategory';
import CategoryModel from '../models/CategoryModel';

class ContactAction {
  private readonly _app: IExpress;
  private readonly _categoryService: ICategoryService;

  constructor(app: IExpress) {
    const resource = '/categories';

    this._app = app;
    this._categoryService = app.get('categoryService');

    this._app.route(`${resource}`).get(this.getByTheme);
  }

  getByTheme = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { query } = req;
      res.json(
        (
          await this._categoryService.getPerTheme(String(query?.theme), getNumber(query.skip), getNumber(query.limit))
        )?.map((category: ICategory) => new CategoryModel(category))
      );
    } catch (err) {
      next(err);
    }
  };
}

export default ContactAction;
