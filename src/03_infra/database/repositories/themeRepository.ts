import BaseRepository from './baseRepository'
import IThemeRepository from '../../interfaces/repositories/IThemeRepository'

import Theme from '../../../02_domain/entities/Theme'

class ThemeRepository extends BaseRepository implements IThemeRepository {
  constructor() {
    super(Theme)
  }
}

export default ThemeRepository
