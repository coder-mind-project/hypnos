import { Document, Aggregate } from 'mongoose';
import IComment from '../entities/IComment';

interface ICommentService {
  getByArticleUri(uri: string, skip?: number, take?: number): Aggregate<unknown>;
  saveComment(commentModel: IComment, customUri: string): Promise<Document>;
}

export default ICommentService;
