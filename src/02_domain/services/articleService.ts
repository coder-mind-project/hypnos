import { DocumentQuery } from "mongoose";

import IArticle from "../interfaces/entities/IArticle";
import IExpress from "../../03_infra/interfaces/dependencyInjection/IExpress";
import IArticleService from "../interfaces/services/IArticleService";
import IUnitOfWork from "../../03_infra/interfaces/IUnitOfWork";

import FoundArticles from "../valueObjects/FoundArticles";

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
}

export default ArticleService
