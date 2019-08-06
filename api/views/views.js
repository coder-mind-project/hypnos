const publicIp = require('public-ip')

module.exports = app => {

    const { View } = app.config.mongooseModels

    /*  
        Define a visualização do usuário ao acessar um artigo
    */

    const setView = async (req, res) => {
        try {
            /* Artigo visualizado */
            const article = {...req.body}

            /* Obtenção de ip do usuário */
            const ip = await publicIp.v4()

            /*  
                Verificação de existencia da visualização, ou seja, caso o usuário esteja
                revendo o artigo
            */
            const exists = await View.findOne({reader: ip, 'article._id': article._id})

            if(!exists){

                const view = new View({
                    reader: ip,
                    article
                })
                await view.save().then( () => res.status(204).send())

            }else{
                let quantity = ++exists.viewsQuantity
                const _id = exists._id

                await View.updateOne({_id},{viewsQuantity: quantity}).then(() => res.status(204).send())
            }

        } catch (error) {
            return res.status(500).send('Ocorreu um erro interno ao obter as informações, tente novamente mais tarde')
        }

    }

    return { setView }
}