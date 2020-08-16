import { DocumentQuery, Document } from "mongoose";

import IArticle from "../interfaces/entities/IArticle";
import IExpress from "../../03_infra/interfaces/dependencyInjection/IExpress";
import IArticleService from "../interfaces/services/IArticleService";
import IUnitOfWork from "../../03_infra/interfaces/IUnitOfWork";

import FoundArticles from "../valueObjects/FoundArticles";
import InvalidArgument from "../../01_presentation/exceptions/InvalidArgument";
import ResourceNotFound from "../../01_presentation/exceptions/ResourceNotFound";

class ArticleService implements IArticleService {
  private readonly _unitOfWork: IUnitOfWork

  constructor(app: IExpress) {
    this._unitOfWork = app.get('unitOfWork')
  }

  public getBoostedArticles(skip: number | undefined, limit: number | undefined): Promise<FoundArticles> {
    return this._unitOfWork.articleRepository.getBoosted(skip, limit)
  }

  public getByCustomUri(customUri: string): DocumentQuery<IArticle | null, IArticle, {}> {
    return this._unitOfWork.articleRepository.getByCustomUri(customUri, ['boosted', 'published'])
  }

  public getRelateds(articleUri: string, limit?: number): Promise<any[] | FoundArticles> {
    return this._unitOfWork.articleRepository.getRelateds(articleUri, limit)
  }

  private validateReader(reader: string): void {
    if (!reader)
      throw new InvalidArgument("É necessário fornecer um leitor válido");
  }

  private async getArticleByCustomUri(articleUri: string): Promise<IArticle> {
    const article: IArticle | null = await this.getByCustomUri(articleUri);

    if (!article)
      throw new ResourceNotFound("Artigo não encontrado");
    else
      return article
  }

  public async saveView(articleUri: string, readerIdentifier: string): Promise<Document> {
    this.validateReader(readerIdentifier);

    const article = await this.getArticleByCustomUri(articleUri);

    const view = await this._unitOfWork.viewRepository.getOne({
      articleId: article._id,
      reader: readerIdentifier
    });

    if (view) {
      view.set('accessCount', Number(view.get('accessCount') + 1));
      return view.save();
    } else {
      const newView = {
        articleId: article._id,
        reader: readerIdentifier,
        accessCount: 1
      }

      return this._unitOfWork.viewRepository.create(newView);
    }
  }

  public async saveLike(articleUri: string, readerIdentifier: string): Promise<Document> {
    this.validateReader(readerIdentifier);

    const article = await this.getArticleByCustomUri(articleUri);

    const like = await this._unitOfWork.likeRepository.getOne({
      articleId: article._id,
      reader: readerIdentifier
    });

    if (like) {
      like.set('active', !like.get('active'));
      return like.save();
    } else {
      const newLike = {
        articleId: article._id,
        reader: readerIdentifier,
        active: true
      }

      return this._unitOfWork.likeRepository.create(newLike);
    }
  }
}

export default ArticleService
