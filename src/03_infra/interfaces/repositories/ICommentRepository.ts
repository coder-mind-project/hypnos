import { Types, Aggregate } from 'mongoose';
import BaseRepository from '../../database/repositories/baseRepository';
import IComment from '../../../02_domain/interfaces/entities/IComment';

interface ICommentRepository extends BaseRepository {
  getByArticle(articleId: Types.ObjectId | string, skip: number, limit: number): Aggregate<IComment[]>;
}

export default ICommentRepository;
