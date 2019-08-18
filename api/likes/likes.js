const publicIp = require('public-ip')

module.exports = app => {

    const { Like } = app.config.mongooseModels

    const { errorLikes } = app.config.managementHttpResponse
    
    const setLike = async (req, res) => {
        try {

            const article = {...req.body}


            let ip = req.connection.remoteAddress || null

            /*await publicIp.v4().then( userIp => {
                if(userIp) ip = userIp
            })*/
            
            if(!ip) throw 'Não conseguimos te identificar, por acaso esta usando uma VPN?'

            const exists = await Like.findOne({'article._id': article._id, reader: ip})

            if(!exists){
                const like = new Like({
                    reader: ip,
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

    const getLike = async (article) => {
        
        try {

            
            let ip = null
            
            await publicIp.v4().then( userIp => {
                if(userIp) ip = userIp
            })
            
            if(!ip) return false
            
            const like = await Like.findOne({'article._id' : {$regex: `${article._id}`}, reader: ip})
            
            return like
        } catch (error) {
            return false
        }

    }

    return { setLike, getLike }
}