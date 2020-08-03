import mongoose from 'mongoose'

/**
 * @description The Like (Article like) Schema
 * @type {mongoose.Schema}
 */
const like = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: mongoose.Types.ObjectId, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

export default mongoose.model('likes', like)
