const Theme = require('../../../02_domain/models/Theme')
const BaseRepository = require('./baseRepository')

class ThemeRepository extends BaseRepository {
  constructor() {
    super(Theme)
  }
}

module.exports = ThemeRepository
