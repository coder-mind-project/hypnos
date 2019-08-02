const MyDate = require('./Date')

module.exports = app => {
    // Schema para os artigos do sistema
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


    return { Article, Theme, Comment }
}