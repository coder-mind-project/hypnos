import { Schema, Types, Model, model } from 'mongoose'
import IComment from '../interfaces/models/IComment'

/**
 * @description The Comment Schema
 * @type {Schema}
 */
const commentSchema = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userId: { type: Types.ObjectId, default: null },
    message: { type: String, required: true },
    articleId: { type: Types.ObjectId, required: true },
    state: { type: String, enum: ['enabled', 'disabled'], required: true, default: 'enabled' },
    confirmedAt: { type: Date, default: null },
    readedAt: { type: Date, default: null },
    answerOf: { type: Types.ObjectId, default: null }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

const Comment: Model<IComment> = model('comments', commentSchema)

export default Comment