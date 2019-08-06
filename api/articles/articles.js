module.exports = app => {

    const { Article } = app.config.mongooseModels

    const { getComments } = app.api.comments.comments

    const get = async (req, res) => {
        /*  
            Obtém os artigos para listagem | Com uso de filtros por palavra chave,
            tema, autor, entre outros
        */

        try {
            
            var limit = parseInt(req.query.limit) || 10
            const query = req.query.query || ''
            const page = req.query.page || 1
            const theme = req.query.theme || ''
            const category = req.query.category || ''
            const author = req.query.author || ''
            
            //Para consultas diretas da home page
            const homeQuery = req.query.home || false

            //Para consultas que incluam artigos impulsionados na query principal
            const boosted = req.query.boosted || false

            //Procura por temas
            const themes = {
                $or: [
                    {'theme.name': {$regex: `${theme}`, $options: 'i'}},
                    {'theme.alias': {$regex: `${theme}`, $options: 'i'}}
                ]
            }

            //Procura por categorias
            const categories = {
                $or: [
                    {'category.name': {$regex: `${category}`, $options: 'i'}},
                    {'category.alias': {$regex: `${category}`, $options: 'i'}}
                ]
            }

            //Procura por autores
            const authors = {
                'author.name': {$regex: `${author}`, $options: 'i'},
            }

            //Procura por artigos publicados ou impulsionados
            const publish = {
                $or: [
                    {published: true},
                    {boosted: true},
                ]
            }

            const onlyBoosted = {
                boosted: true
            }
            
            //Procura por somente artigos não excluídos
            const config = {
                deleted: false,
            }

            if(limit > 100) limit = 10

            const boostedArticles = homeQuery ? await getBoostedArticles() : null

            let count = await Article.aggregate([
                {$match : {$and: [
                    {$or: [
                        {title: {$regex: `${query}` , $options: 'i'}},
                        {shortDescription: {$regex: `${query}` , $options: 'i'}},
                        {longDescription: {$regex: `${query}` , $options: 'i'}},

                    ]},
                    {$or: [
                        themes,
                        categories,
                    ]},
                    {inactivated: false},
                    authors,
                    boosted ? onlyBoosted : publish,
                    config
                ]}
            }]).count("id")
            
            count = count.length > 0 ? count.reduce(item => item).id : 0

            Article.aggregate([
                {$match : {$and: [
                    {$or: [
                        {title: {$regex: `${query}` , $options: 'i'}},
                        {shortDescription: {$regex: `${query}` , $options: 'i'}},
                        {longDescription: {$regex: `${query}` , $options: 'i'}}
                    ]},
                    {$or: [
                        themes,
                        categories,
                    ]},
                    {inactivated: false},
                    authors,
                    boosted ? onlyBoosted : publish,
                    config
                ]}
                },{$sort: {createdAt: -1}}])
                .skip(page * limit - limit).limit(limit).then(articles => res.json({articles, count, limit, boostedArticles}))
        } catch (error) {
            return res.status(500).send('Ocorreu um erro interno ao obter as informações, tente novamente mais tarde')
        }
    }

    /* Obtem os artigos impulsionados */
    const getBoostedArticles = async () => {
        
        try {
            const config = {
                deleted: false,
            }
            
            const limit = 5

            let count = await Article.aggregate([
                {$match : {$and: [
                    {boosted: true},
                    config
                ]}
            }]).count("id")
            
            count = count.length > 0 ? await count.reduce(item => item).id : 0

            const articles = await Article.aggregate([
                {$match : {$and: [
                    {boosted: true},
                    config
                ]}
                },{$sort: {createdAt: -1}}]).limit(limit)

            return {articles, count}
        
        } catch (error) {
            return {error: true, msg: 'Ocorreu um erro ao buscar os artigos impulsionados'}
        }
    }

    /* Obtém o artigo pela uri customizada */
    const getOne = async (req, res) => {
        try {
            const customURL = req.params.resource
            
            const article = await Article.findOne({customURL, inactivated: false})
            
            if(!article) return res.status(404).send('Artigo não encontrado')
            const result = await getComments(article._id)
            const comments = result.comments || []

            return res.json({article, comments})
        } catch (error) {
            return res.status(500).send('Ocorreu um erro ao obter o artigo, por favor tente mais tarde')
        }
    }

    /* Obtém os artigos relacionados de um determinado artigo */
    const getRelateds = async (req, res) => {
        try {
            const target = req.params.resource
            
            /* Recebe o limite de artigos relacionados */
            let limit = parseInt(req.query.limit) || 3

            if(limit > 10) limit = 3

            /* Caso o recurso não esteja definido, recebe apenas os artigos impulsionados */
            if(!target){
                let articles = await getBoostedArticles()
                
                articles = articles.articles.filter((elem, index) => index <= (limit-1))

                return res.json(articles)
            }else{
                const article = await Article.findOne({customURL: target})

                if(!article) {
                    let articles = await getBoostedArticles()
                    articles = articles.articles.filter((elem, index) => index <= (limit-1))

                    return res.json(articles)
                }

                await Article.aggregate([
                    {$match: {
                        $or: [
                            {'theme._id': article.theme._id},
                            {'category._id': article.category._id}
                        ],
                        _id: {'$ne': article._id},
                        published: true
                    }
                }]).limit(limit).then(response => res.json(response))
            }

        } catch (error) {
            return res.status(500).send('Ocorreu um erro interno ao obter as informações, tente novamente mais tarde')
        }
    }

    return { get, getOne, getRelateds }
}