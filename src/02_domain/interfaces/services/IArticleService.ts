import IArticle from '../entities/IArticle';
import FoundArticles from '../../valueObjects/FoundArticles';

interface IArticleService {
  getPublishedArticles(skip?: number, limit?: number): Promise<FoundArticles>;
  getBoostedArticles(skip?: number, limit?: number): Promise<FoundArticles>;
  getByCustomUri(customUri: string, reader?: string): Promise<IArticle | null>;
  getOne(customUri: string): Promise<IArticle | null>;
  getRelateds(articleUri: string, limit?: number): Promise<FoundArticles>;
  saveLike(articleId: string, readerName: string): Promise<boolean | string>;
  get(skip: number | undefined, limit?: number | undefined, term?: string): Promise<FoundArticles>;
}

export default IArticleService;
