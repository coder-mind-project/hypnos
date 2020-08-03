import BaseRepository from './baseRepository'
import Comment from '../../../02_domain/models/Comment'

import mongoose from 'mongoose'

class CommentRepository extends BaseRepository {
  constructor() {
    super(Comment)
  }

  getByArticle(articleId: mongoose.Types.ObjectId | String, skip: number, take: number) {
    return Comment.aggregate([
      {
        $match: { articleId, state: 'enabled' }
      },
      {
        $sort: { createdAt: -1 }
      }
    ])
      .skip(skip)
      .limit(take)
  }
}

export default CommentRepository
