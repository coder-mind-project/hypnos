import { Schema, Types, Model, model } from 'mongoose'
import ILike from '../interfaces/entities/ILike'

/**
 * @description The Like (Article like) Schema
 * @type {Schema}
 */
const likeSchema = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: Types.ObjectId, required: true },
    active: { type: Boolean, required: true, default: true }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

const Like: Model<ILike> = model('likes', likeSchema)

export default Like
