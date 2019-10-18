const publicIp = require('public-ip')

module.exports = app => {

    const { View } = app.config.mongooseModels

    /*  
        Define a visualização do usuário ao acessar um artigo
    */

    const setView = async (article, uip) => {
        try {
            if(uip){
                const exists = await View.findOne({reader: uip, 'article._id': article._id})
                /*  
                    Verificação de existencia da visualização, ou seja, caso o usuário esteja
                    revendo o artigo
                */
                if(!exists){
                    const view = new View({
                        reader: uip,
                        article,
                        startRead: new Date()
                    })
                    return await view.save()
                }else{
                    let quantity = ++exists.viewsQuantity
                    const _id = exists._id
                    
                    return await View.updateOne({_id},{viewsQuantity: quantity})
                }
            }else{
                /* Caso não exista o endereço de IP do leitor */
                const view = new View({
                    startRead: new Date(),
                    article,
                    reader: `${Date.now() + (Math.round(Math.random()*5*5*30))}`
                })

                return await view.save()
            }
        } catch (error) {
            return 'Ocorreu um erro interno ao obter as informações, tente novamente mais tarde'
        }
        
    }
    
    return { setView }
}