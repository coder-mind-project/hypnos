const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

/**
 * @description The View (Article view) Schema
 * @type {mongoose.Schema}
 */
const view = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: mongoose.Schema.ObjectId, required: true },
    accessCount: { type: Number, default: 1, required: true, min: 1 }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

view.plugin(validator)

module.exports = mongoose.model('views', view)
