import { Types, Aggregate } from 'mongoose';

import ICommentRepository from '../../interfaces/repositories/ICommentRepository';
import BaseRepository from './baseRepository';

import Comment from '../../../02_domain/entities/Comment';
import IComment from '../../../02_domain/interfaces/entities/IComment';

class CommentRepository extends BaseRepository implements ICommentRepository {
  constructor() {
    super(Comment);
  }

  public getByArticle(articleId: Types.ObjectId | string, skip: number, limit: number): Aggregate<IComment[]> {
    return Comment.aggregate([
      {
        $match: { articleId, state: 'enabled' }
      },
      {
        $sort: { createdAt: -1 }
      }
    ])
      .skip(skip)
      .limit(limit);
  }
}

export default CommentRepository;
