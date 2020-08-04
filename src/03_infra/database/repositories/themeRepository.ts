import Theme from '../../../02_domain/models/Theme'
import BaseRepository from './baseRepository'

class ThemeRepository extends BaseRepository {
  constructor() {
    super(Theme)
  }
}

export default ThemeRepository
