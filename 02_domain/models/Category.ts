import mongoose from 'mongoose'

/**
 * @description The Category Schema
 * @type {mongoose.Schema}
 */
const category = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, unique: true },
  themeId: { type: mongoose.Types.ObjectId, required: true },
  alias: String,
  description: String,
  state: { type: String, required: true, default: 'active' }
})

export default mongoose.model('categories', category)
