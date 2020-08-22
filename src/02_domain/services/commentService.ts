import ResourceNotFound from '../../01_presentation/exceptions/ResourceNotFound';
import InvalidArgument from '../../01_presentation/exceptions/InvalidArgument';

import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import IArticleService from '../interfaces/services/IArticleService';
import ICommentService from '../interfaces/services/ICommentService';
import IComment from '../interfaces/entities/IComment';
import IUnitOfWork from '../../03_infra/interfaces/IUnitOfWork';
import IArticle from '../interfaces/entities/IArticle';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsValidators = require('@allanalves23/jsvalidators');

class CommentService implements ICommentService {
  private readonly _articleService: IArticleService;
  private readonly _unitOfWork: IUnitOfWork;

  constructor(app: IExpress) {
    this._unitOfWork = app.get('unitOfWork');
    this._articleService = app.get('articleService');
  }

  private validate(commentModel: IComment): void {
    if (!commentModel.userName) throw new InvalidArgument('Nome é obrigatório');

    if (!commentModel.userEmail) throw new InvalidArgument('E-mail é obrigatório');

    if (!jsValidators.emailIsValid(commentModel.userEmail)) throw new InvalidArgument('E-mail inválido');

    if (!commentModel.message.trim()) throw new InvalidArgument('Informe um comentário');

    if (commentModel.message.trim().length > 10000)
      throw new InvalidArgument('Comentários acima de 10 mil caracteres não são permitidos');
  }

  private validateArticle(article: IArticle | null): void {
    if (!article) {
      throw new ResourceNotFound('Artigo não encontrado');
    }
  }

  public async getByArticleUri(uri: string, skip = 0, take = 15): Promise<IComment[]> {
    const article = await this._articleService.getByCustomUri(uri);
    this.validateArticle(article);

    return await this._unitOfWork.commentRepository.getByArticle(article!._id, skip, take);
  }

  public async saveComment(commentModel: IComment, customUri: string): Promise<string> {
    this.validate(commentModel);

    const article = await this._articleService.getByCustomUri(customUri);
    this.validateArticle(article);

    commentModel.articleId = article!._id;

    return (await this._unitOfWork.commentRepository.create(commentModel)).get('createdAt');
  }
}

export default CommentService;
