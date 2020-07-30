const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

/**
 * @description The Comment Schema
 * @type {app.mongo.Schema}
 */
const comment = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId, default: null },
    message: { type: String, required: true },
    articleId: { type: mongoose.Schema.ObjectId, required: true },
    state: { type: String, enum: ['enabled', 'disabled'], required: true, default: 'enabled' },
    confirmedAt: { type: Date, default: null },
    readedAt: { type: Date, default: null },
    answerOf: { type: mongoose.Schema.ObjectId, default: null }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

comment.plugin(validator)

module.exports = mongoose.model('comments', comment)
