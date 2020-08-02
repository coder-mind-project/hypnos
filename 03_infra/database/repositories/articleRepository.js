const Article = require('../../../02_domain/models/Article')
const BaseRepository = require('./baseRepository')

const ResourceNotFound = require('../../../01_presentation/exceptions/ResourceNotFound')

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

  async getRelateds(articleUri, limit) {
    if (!articleUri) {
      return this.getBoosted(0, limit)
    }

    const article = await Article.findOne({ customUri: `${articleUri}` })

    if (!article) throw new ResourceNotFound('Artigo não encontrado')

    return Article.aggregate([
      {
        $match: {
          _id: { $ne: article.Id },
          $and: [
            {
              $or: [
                { state: 'published' },
                { state: 'boosted' }
              ]
            }
          ],
          $or: [
            {
              $and: [
                { themeId: article.themeId },
                { themeId: { $ne: null } }
              ]
            },
            {
              $and: [
                { categoryId: article.categoryId },
                { categoryId: { $ne: null } }
              ]
            }
          ]
        }
      },
      {
        $sort: { publishedAt: -1, boostedAt: -1 }
      }])
  }
}

module.exports = ArticleRepository
