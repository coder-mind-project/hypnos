import { Types, Aggregate } from 'mongoose';
import BaseRepository from '../../database/repositories/baseRepository';

interface ICommentRepository extends BaseRepository {
  getByArticle(articleId: Types.ObjectId | string, skip: number, limit: number): Aggregate<unknown>;
}

export default ICommentRepository;
