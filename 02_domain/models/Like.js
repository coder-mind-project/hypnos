const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

/**
 * @description The Like (Article like) Schema
 * @type {mongoose.Schema}
 */
const like = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: mongoose.Schema.ObjectId, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

like.plugin(validator)

module.exports = mongoose.model('likes', like)
