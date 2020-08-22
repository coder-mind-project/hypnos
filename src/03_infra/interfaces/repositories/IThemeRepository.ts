import BaseRepository from '../../database/repositories/baseRepository';
import ITheme from '../../../02_domain/interfaces/entities/ITheme';

interface IThemeRepository extends BaseRepository {
  getActiveThemes(skip: number, limit: number): Promise<ITheme[]>;
}

export default IThemeRepository;
