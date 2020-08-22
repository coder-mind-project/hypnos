import BaseRepository from './baseRepository';
import IThemeRepository from '../../interfaces/repositories/IThemeRepository';

import Theme from '../../../02_domain/entities/Theme';
import ITheme from '../../../02_domain/interfaces/entities/ITheme';

class ThemeRepository extends BaseRepository implements IThemeRepository {
  constructor() {
    super(Theme);
  }

  public async getActiveThemes(skip: number, limit: number): Promise<ITheme[]> {
    return await Theme.find({ state: 'active' }).skip(skip).limit(limit);
  }
}

export default ThemeRepository;
