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

  /* async getRelateds(customURL, limit = 3) {
    try {
      if (limit > 10) limit = 3
      if (!customURL) {
        let articles = await getBoostedArticles()

        articles = articles.articles.filter((elem, index) => index <= (limit - 1))
        return res.json(articles)
      } else {
        const article = await Article.findOne({ customURL })

        if (!article) {
          let articles = await getBoostedArticles()
          articles = articles.articles.filter((elem, index) => index <= (limit - 1))

          return res.json(articles)
        }

        await Article.aggregate([
          {
            $match: {
              $or: [
                { 'theme._id': article.theme._id },
                { 'category._id': article.category._id }
              ],
              _id: { $ne: article._id },
              published: true,
              inactivated: false,
              deleted: false
            }
          }]).limit(limit).then(response => res.json(response))
      }
    } catch (error) {
      return res.status(500).send('Ocorreu um erro interno ao obter as informações, tente novamente mais tarde')
    }
  } */
  /* async getPopulars(skip, limit) {
    // Para consultas que incluam artigos impulsionados na query principal
    const boosted = req.query.boosted || false

    // Procura por temas
    const themes = {
      $or: [
        { 'theme.name': { $regex: `${theme}`, $options: 'i' } },
        { 'theme.alias': { $regex: `${theme}`, $options: 'i' } }
      ]
    }

    // Procura por categorias
    const categories = {
      $or: [
        { 'category.name': { $regex: `${category}`, $options: 'i' } },
        { 'category.alias': { $regex: `${category}`, $options: 'i' } }
      ]
    }

    // Procura por autores
    const authors = {
      'author.name': { $regex: `${author}`, $options: 'i' }
    }

    // Procura por artigos publicados ou impulsionados
    const publish = {
      $or: [
        { published: true },
        { boosted: true }
      ]
    }

    const onlyBoosted = {
      boosted: true
    }

    // Procura por somente artigos não excluídos
    const config = {
      deleted: false
    }

    if (limit > 100) limit = 10

    const boostedArticles = homeQuery ? await this.getBoostedArticles() : null

    let count = await Article.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { title: { $regex: `${query}`, $options: 'i' } },
                { shortDescription: { $regex: `${query}`, $options: 'i' } },
                { longDescription: { $regex: `${query}`, $options: 'i' } }

              ]
            },
            {
              $or: [
                themes,
                categories
              ]
            },
            { inactivated: false },
            { deleted: false },
            authors,
            boosted ? onlyBoosted : publish,
            config
          ]
        }
      }]).count('id')

    count = count.length > 0 ? count.reduce(item => item).id : 0

    Article.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { title: { $regex: `${query}`, $options: 'i' } },
                { shortDescription: { $regex: `${query}`, $options: 'i' } },
                { longDescription: { $regex: `${query}`, $options: 'i' } }
              ]
            },
            {
              $or: [
                themes,
                categories
              ]
            },
            { inactivated: false },
            { deleted: false },
            authors,
            boosted ? onlyBoosted : publish,
            config
          ]
        }
      }, { $sort: { publishAt: -1 } }])
      .skip(page * limit - limit).limit(limit).then(articles => res.json({ articles, count, limit, boostedArticles }))
  } */
}

module.exports = ArticleRepository
