import BaseRepository from '../../database/repositories/baseRepository';
import ICategory from '../../../02_domain/interfaces/entities/ICategory';

interface ICategoryRepository extends BaseRepository {
  getByTheme(theme: string, skip: number, limit: number): Promise<ICategory[]>;
}

export default ICategoryRepository;
