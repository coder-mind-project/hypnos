const Article = require('../../../02_domain/models/Article')
const BaseRepository = require('./baseRepository')

class ArticleRepository extends BaseRepository {
  constructor() {
    super(Article)
  }

  getByCustomUri(customUri) {
    return Article.findOne({ customUri, state: 'published' || 'boosted' })
  }

  async getBoosted(skip = 0, limit = 5) {
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
