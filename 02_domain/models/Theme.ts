import mongoose from 'mongoose'

/**
 * @description The Theme Schema
 * @type {mongoose.Schema}
 */
const theme = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, unique: true, required: true },
  alias: String,
  description: String,
  state: { type: String, default: 'active' }
})

export default mongoose.model('themes', theme)
