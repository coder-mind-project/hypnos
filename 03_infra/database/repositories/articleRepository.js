const Article = require('../../../02_domain/models/Article')
const BaseRepository = require('./baseRepository')

class ArticleRepository extends BaseRepository {
  constructor() {
    super(Article)
  }

  getByCustomUri(customUri, stateCriteria = []) {
    const a = {
      customUri,
      $or: stateCriteria.map(value => Object.assign({}, { state: value }))
    }
    return Article.findOne(a)
  }

  async getBoosted(skip, limit) {
    const count = await Article.countDocuments({ state: 'boosted' })

    const articles = await Article.aggregate([
      {
        $match: { state: 'boosted' }
      },
      {
        $sort: { publishAt: -1 }
      }
    ]).skip(skip).limit(limit)

    return { articles, count }
  }
}

module.exports = ArticleRepository
