import { DocumentQuery } from 'mongoose';

import IArticle from '../../../02_domain/interfaces/entities/IArticle';

import FoundArticles from '../../../02_domain/valueObjects/FoundArticles';

interface IArticleRepository {
  getByCustomUri(customUri: string, stateCriteria: Array<string>): DocumentQuery<IArticle | null, IArticle, unknown>;
  getBoosted(skip?: number, limit?: number): Promise<FoundArticles>;
  getRelateds(articleUri: string, limit?: number): Promise<FoundArticles>;
}

export default IArticleRepository;
