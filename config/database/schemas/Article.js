const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

/**
   * @description The Article Schema
   * @type {mongoose.Schema}
   */
const article = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null, trim: true },
    state: {
      type: String,
      enum: ['draft', 'published', 'inactivated', 'removed', 'boosted'],
      required: true,
      default: 'draft'
    },
    themeId: { type: mongoose.Schema.ObjectId, default: null },
    categoryId: { type: mongoose.Schema.ObjectId, default: null },
    userId: { type: mongoose.Schema.ObjectId, required: true },
    logoImg: { type: String, default: null, trim: true },
    secondaryImg: { type: String, default: null, trim: true },
    headerImg: { type: String, default: null, trim: true },
    contentType: { type: String, required: true, enum: ['default', 'md'], default: 'default' },
    content: { type: String, default: null },
    socialVideoType: { type: String, enum: ['youtube', 'other', null], default: null },
    socialVideo: { type: String, default: null, trim: true },
    socialRepositoryType: { type: String, enum: ['github', 'gitlab', 'other', null], default: null },
    socialRepository: { type: String, default: null, trim: true },
    customUri: {
      type: String,
      required: true,
      unique: true,
      default: () => `${Date.now()}${Math.floor(Math.random() * 123555738)}`,
      trim: true
    },
    removedAt: { type: Date, default: null },
    inactivatedAt: { type: Date, default: null },
    publishedAt: { type: Date, default: null },
    boostedAt: { type: Date, default: null }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

article.plugin(validator)
article.pre('updateOne', function (next) {
  this.options.runValidators = true
  this.options.context = 'query'
  next()
})

article.pre('updateMany', function (next) {
  this.options.runValidators = true
  this.options.context = 'query'
  next()
})

module.exports = mongoose.model('articles', article)
