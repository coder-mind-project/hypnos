const UnitOfWork = require('../../03_infra/database/unitOfWork')

class ArticleService {
  /* async get(page = 1, limit = 10, query = '', theme = '', category = '', author = '') {
    // Para consultas diretas da home page
    const homeQuery = req.query.home || false

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

  async getBoostedArticles() {
    return UnitOfWork.articleRepository.getBoosted()
  }

  /* async getOne(customURL, uip) {
    try {
      const article = await Article.findOne({ customURL, inactivated: false, deleted: false })

      if (!article) return res.status(404).send('Artigo não encontrado')

      await setView(article, uip)
      // const userLike = await getLike(article)
      const result = await getComments(article._id)
      const comments = result.comments || []
      const countComments = result.count

      return res.json({ article, comments, countComments })
    } catch (error) {
      return res.status(500).send('Ocorreu um erro ao obter o artigo, por favor tente mais tarde')
    }
  } */

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
}

module.exports = new ArticleService()
