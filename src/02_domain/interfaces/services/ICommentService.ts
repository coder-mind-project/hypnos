import IComment from '../entities/IComment';

interface ICommentService {
  getByArticleUri(uri: string, skip?: number, take?: number): Promise<IComment[]>;
  saveComment(commentModel: IComment, customUri: string): Promise<string>;
}

export default ICommentService;
