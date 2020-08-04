import Article from '../../../02_domain/models/Article'
import BaseRepository from '../../../02_domain/models/Article'

import ResourceNotFound from '../../../01_presentation/exceptions/ResourceNotFound'

class ArticleRepository {
  getByCustomUri(customUri: string, stateCriteria: Array<string> = []) {
    return Article.findOne({
      customUri,
      $or: stateCriteria.map((value: string) => Object.assign({}, { state: value }))
    })
  }

  async getBoosted(skip: number, limit: number) {
    const count = await Article.countDocuments({ state: 'boosted' })

    const articles = await Article.aggregate([
      {
        $match: { state: 'boosted' }
      },
      {
        $sort: { publishAt: -1 }
      }
    ])
      .skip(skip)
      .limit(limit)

    return { articles, count }
  }

  async getRelateds(articleUri: String, limit: number) {
    if (!articleUri) {
      return this.getBoosted(0, limit)
    }

    const article = await Article.findOne({ customUri: `${articleUri}` })

    if (!article) throw new ResourceNotFound('Artigo não encontrado')

    return Article.aggregate([
      {
        $match: {
          _id: { $ne: article._id },
          $and: [
            {
              $or: [{ state: 'published' }, { state: 'boosted' }]
            }
          ],
          $or: [
            {
              $and: [{ themeId: article.get('themeId') }, { themeId: { $ne: null } }]
            },
            {
              $and: [{ categoryId: article.get('categoryId') }, { categoryId: { $ne: null } }]
            }
          ]
        }
      },
      {
        $sort: { publishedAt: -1, boostedAt: -1 }
      }
    ])
  }
}

export default ArticleRepository
