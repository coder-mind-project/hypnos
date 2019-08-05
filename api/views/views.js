const publicIp = require('public-ip')

module.exports = app => {

    const { View } = app.config.mongooseModels

    const setView = async (req, res) => {
        const article = {...req.body}
        try {
            const ip = await publicIp.v4()

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
            return res.status(500).send(error)
        }

    }

    return { setView }
}