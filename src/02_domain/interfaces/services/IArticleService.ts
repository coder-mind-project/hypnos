import { DocumentQuery, Document } from 'mongoose';

import IArticle from '../entities/IArticle';
import FoundArticles from '../../valueObjects/FoundArticles';

interface IArticleService {
  getBoostedArticles(skip?: number, limit?: number): Promise<FoundArticles>;
  getByCustomUri(customUri: string): DocumentQuery<IArticle | null, IArticle, unknown>;
  getRelateds(articleUri: string, limit?: number): Promise<unknown[] | FoundArticles>;
  saveView(articleId: string, readerName: string): Promise<Document>;
  saveLike(articleId: string, readerName: string): Promise<Document>;
}

export default IArticleService;
