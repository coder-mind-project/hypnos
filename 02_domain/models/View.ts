import mongoose from 'mongoose'

/**
 * @description The View (Article view) Schema
 * @type {mongoose.Schema}
 */
const view = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: mongoose.Types.ObjectId, required: true },
    accessCount: { type: Number, default: 1, required: true, min: 1 }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

export default mongoose.model('views', view)
