const publicIp = require('public-ip')

module.exports = app => {

    const { Like } = app.config.mongooseModels

    const { errorLikes } = app.config.managementHttpResponse
    
    const setLike = async (req, res) => {
        try {

            const article = {...req.body}

            const reader = article.reader || Date.now() + '&' + Math.floor(Math.random()*25)
            const exists = await Like.findOne({'article._id': article._id, reader})

            if(!exists){
                const like = new Like({
                    reader,
                    article,
                    confirmed: true
                })

                like.save().then( response => res.status(201).send(response))
            }else{
                Like.updateOne({'article._id': article._id, reader: ip}, {
                    confirmed: !exists.confirmed
                }).then( () => {
                    exists.confirmed = !exists.confirmed
                    return res.status(200).send(exists)
                })
            }
        } catch (error) {
            error = await errorLikes(error)
            return res.status(error.code).send(error.msg)
        }
    }

    const getLike = async (article, ip) => {

        try {
            const like = await Like.findOne({'article._id' : {$regex: `${article._id}`}, reader: ip})
            
            return like
        } catch (error) {
            return false
        }

    }

    return { setLike, getLike }
}