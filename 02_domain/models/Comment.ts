import mongoose from 'mongoose'

/**
 * @description The Comment Schema
 * @type {app.mongo.Schema}
 */
const comment = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, auto: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, default: null },
    message: { type: String, required: true },
    articleId: { type: mongoose.Types.ObjectId, required: true },
    state: { type: String, enum: ['enabled', 'disabled'], required: true, default: 'enabled' },
    confirmedAt: { type: Date, default: null },
    readedAt: { type: Date, default: null },
    answerOf: { type: mongoose.Types.ObjectId, default: null }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

export default mongoose.model('comments', comment)
