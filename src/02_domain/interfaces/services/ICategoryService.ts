import ICategory from '../entities/ICategory';

interface ICategoryService {
  getPerTheme(theme: string, skip?: number, limit?: number): Promise<ICategory[] | null>;
}

export default ICategoryService;
