const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

/**
 * @description The Category Schema
 * @type {mongoose.Schema}
 */
const category = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  name: { type: String, unique: true },
  themeId: { type: mongoose.Schema.ObjectId, required: true },
  alias: String,
  description: String,
  state: { type: String, required: true, default: 'active' }
})

category.plugin(validator)
category.pre('updateOne', function (next) {
  this.options.runValidators = true
  this.options.context = 'query'
  next()
})

module.exports = mongoose.model('categories', category)
