import IArticle from '../interfaces/entities/IArticle';
import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import IArticleService from '../interfaces/services/IArticleService';
import IUnitOfWork from '../../03_infra/interfaces/IUnitOfWork';

import FoundArticles from '../valueObjects/FoundArticles';
import ResourceNotFound from '../../01_presentation/exceptions/ResourceNotFound';

class ArticleService implements IArticleService {
  private readonly _unitOfWork: IUnitOfWork;

  constructor(app: IExpress) {
    this._unitOfWork = app.get('unitOfWork');
  }

  public getBoostedArticles(skip: number | undefined, limit: number | undefined): Promise<FoundArticles> {
    return this._unitOfWork.articleRepository.getBoosted(skip, limit);
  }

  public async getOne(customUri: string): Promise<IArticle | null> {
    return this._unitOfWork.articleRepository.getByCustomUri(customUri, ['boosted', 'published']);
  }

  public getRelateds(articleUri: string, limit?: number): Promise<FoundArticles> {
    return this._unitOfWork.articleRepository.getRelateds(articleUri, limit);
  }

  public get(skip: number | undefined, limit?: number | undefined): Promise<FoundArticles> {
    return this._unitOfWork.articleRepository.getArticles(skip, limit);
  }

  private validateReader(reader?: string): string {
    return reader || this.generateReader();
  }

  private generateReader(): string {
    return String(Date.now() * (1 + Math.random()));
  }

  public async getByCustomUri(articleUri: string, reader?: string): Promise<IArticle> {
    const article: IArticle | null = await this.getOne(articleUri);

    if (!article)
      throw new ResourceNotFound('Artigo não encontrado');

    this.saveView(articleUri, this.validateReader(reader));
    return article;
  }

  private async saveView(articleUri: string, readerIdentifier: string): Promise<string> {
    const article = await this.getOne(articleUri);

    if (!article)
      throw new ResourceNotFound('Artigo não encontrado');

    const view = await this._unitOfWork.viewRepository.getOne({
      articleId: article._id,
      reader: readerIdentifier
    });

    if (view) {
      view.set('accessCount', Number(view.get('accessCount') + 1));
      return (await view.save()).get('accessCount');
    } else {
      const newView = {
        articleId: article._id,
        reader: readerIdentifier,
        accessCount: 1
      };

      return (await this._unitOfWork.viewRepository.create(newView)).get('accessCount');
    }
  }

  public async saveLike(articleUri: string, readerIdentifier: string): Promise<boolean | string> {
    const reader = this.validateReader(readerIdentifier);

    const article = await this.getOne(articleUri);

    if (!article)
      throw new ResourceNotFound('Artigo não encontrado');

    const like = await this._unitOfWork.likeRepository.getOne({
      articleId: article._id,
      reader
    });

    if (like) {
      like.set('active', !like.get('active'));
      return (await like.save()).get('active');
    } else {
      const newLike = {
        articleId: article._id,
        reader,
        active: true
      };

      return (await this._unitOfWork.likeRepository.create(newLike)).get('createdAt');
    }
  }
}

export default ArticleService;
