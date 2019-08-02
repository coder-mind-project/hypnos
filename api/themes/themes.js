module.exports = app => {

    const { Theme } = app.config.mongooseModels

    const get = async (req, res) => {
            /*  Responsável por obter os temas por filtros de 
                palavras chave. Ocorrendo a possibilidade de limitar 
                por páginação e também obtendo a quantidade total de registros
                por filtragem
             */

            
            try {
                var limit = parseInt(req.query.limit) || 10
                const query = req.query.query || ''
                const page = req.query.page || 1
    
                if(limit > 100) limit = 10
    
                let count = await Theme.aggregate([
                    {$match : 
                        {$and: [
                                {$or : [
                                    {name: {$regex: `${query}` , $options: 'i'}},
                                    {alias: {$regex: `${query}` , $options: 'i'}},
                                ]
                                },
                                {
                                    state: 'active'
                                }
                            ]
                        }
                    }
                ]).count('id')
    
                count = count.length > 0 ? count.reduce(item => item).id : 0
    
                Theme.aggregate([
                    {$match : 
                        {$and: [
                                {$or : [
                                    {name: {$regex: `${query}` , $options: 'i'}},
                                    {alias: {$regex: `${query}` , $options: 'i'}},
                                ]
                                },
                                {
                                    state: 'active'
                                }
                            ]
                        }
                    }
                ]).skip(page * limit - limit).limit(limit).then(themes => res.json({themes, count, limit}))
            } catch (error) {
                return res.status(500).send('Ops, ocorreu um erro ao recuperar as informações. Tente atualizar a página')
            }
    }

    return { get }
}