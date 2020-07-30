const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

/**
 * @description The Theme Schema
 * @type {mongoose.Schema}
 */
const theme = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  name: { type: String, unique: true, required: true },
  alias: String,
  description: String,
  state: { type: String, default: 'active' }
})

theme.plugin(validator)
theme.pre('updateOne', function (next) {
  this.options.runValidators = true
  this.options.context = 'query'
  next()
})

module.exports = mongoose.model('themes', theme)
