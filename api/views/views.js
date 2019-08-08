const publicIp = require('public-ip')

module.exports = app => {

    const { View } = app.config.mongooseModels

    /*  
        Define a visualização do usuário ao acessar um artigo
    */

    const setView = async (article) => {
        try {

            /* Obtenção de ip do usuário */
            let ip = 'anonimous'

            await publicIp.v4().then( userIp => {
                if(userIp) ip = userIp 
            })

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
                return await view.save()

            }else{
                let quantity = ++exists.viewsQuantity
                const _id = exists._id

                return await View.updateOne({_id},{viewsQuantity: quantity})
            }

        } catch (error) {
            return 'Ocorreu um erro interno ao obter as informações, tente novamente mais tarde'
        }

    }

    return { setView }
}