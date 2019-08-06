const MyDate = require('./Date')

module.exports = app => {

    // Schema para os artigos
    const article = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        author: Object,
        title: String,
        theme: Object,
        category: Object,
        shortDescription: String,
        longDescription: String,
        textArticle: String,
        smallImg: String,
        mediumImg: String,
        bigImg: String,
        customURL: {type: String, unique: true},
        viewsCounter: Number,
        rating: Number,
        sharesCounter: Number,
        likesCounter: Number,
        dislikesCounter: Number,
        createdAt: {type: Date, default: MyDate.setTimeZone('-3')},
        updatedAt: {type: Date, default: MyDate.setTimeZone('-3')},
        publishAt: {type: Date, default: MyDate.setTimeZone('-3')},
        published: Boolean,
        boosted: Boolean,
        deleted: Boolean,
        inactivated: Boolean
    })
    
    const Article = app.mongoose.model('articles', article)



    //Schema para os temas dos artigos
    const theme = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        name: {type: String, unique: true},
        alias: String,
        description: String,
        state: String
    })
    
    const Theme = app.mongoose.model('themes', theme)
    


    // Schema para os comentários dos artigos
    const comment = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        article: Object,
        userName: String,
        userEmail: String,
        comment: String,
        confirmed: {type: Boolean, default: false},
        readed: {type: Boolean, default: false},
        answerOf: {type: Object, default: null},
        createdAt: {type: Date, default: MyDate.setTimeZone('-3')}
    })

    const Comment = app.mongoose.model('comments', comment)


    
    // Schema para as visualizações dos artigos
    const view = new app.mongoose.Schema({
        _id: {type: app.mongoose.Schema.ObjectId, auto: true},
        reader: String,
        startRead: {type: Date, default: MyDate.setTimeZone('-3')},
        article: Object,
        viewsQuantity: {type: Number, default: 1}
    })

    const View = app.mongoose.model('views', view)


    return { Article, Theme, Comment, View }
}