import BaseRepository from './baseRepository';
import ICategoryRepository from '../../interfaces/repositories/ICategoryRepository';

import Category from '../../../02_domain/entities/Category';
import ICategory from '../../../02_domain/interfaces/entities/ICategory';

class CategoryRepository extends BaseRepository implements ICategoryRepository {
  constructor() {
    super(Category);
  }

  public async getByTheme(theme: string, skip: number, limit: number): Promise<ICategory[]> {
    return await Category.aggregate([
      {
        $lookup: {
          from: 'themes',
          localField: 'themeId',
          foreignField: '_id',
          as: 'theme'
        }
      },
      { $match: { state: 'active', 'theme.name': { $regex: `${theme}`, $options: 'i' } } },
      {
        $project: {
          name: 1,
          description: 1,
          alias: 1,
          state: 1,
          theme: { $arrayElemAt: ['$theme', 0] }
        }
      }
    ])
      .skip(skip)
      .limit(limit);
  }
}

export default CategoryRepository;
