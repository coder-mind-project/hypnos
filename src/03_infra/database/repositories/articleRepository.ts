import { DocumentQuery } from 'mongoose';

import BaseRepository from './baseRepository';
import Article from '../../../02_domain/entities/Article';
import IArticle from '../../../02_domain/interfaces/entities/IArticle';
import IArticleRepository from '../../interfaces/repositories/IArticleRepository';

import ResourceNotFound from '../../../01_presentation/exceptions/ResourceNotFound';
import FoundArticles from '../../../02_domain/valueObjects/FoundArticles';

class ArticleRepository extends BaseRepository implements IArticleRepository {
  constructor() {
    super(Article);
  }

  public getByCustomUri(
    customUri: string,
    stateCriteria: Array<string> = []
  ): DocumentQuery<IArticle | null, IArticle, unknown> {
    return Article.findOne({
      customUri,
      $or: stateCriteria.map((value: string) => Object.assign({}, { state: value }))
    });
  }

  public async getBoosted(skip = 0, limit = 5): Promise<FoundArticles> {
    const count = await Article.countDocuments({ state: 'boosted' });

    const articles = await Article.aggregate([
      {
        $match: { state: 'boosted' }
      },
      {
        $sort: { publishAt: -1 }
      }
    ])
      .skip(skip)
      .limit(limit);

    return new FoundArticles(articles, count);
  }

  public async getRelateds(articleUri: string, limit = 5): Promise<unknown[] | FoundArticles> {
    if (!articleUri) {
      return this.getBoosted(0, limit);
    }

    const article = await Article.findOne({ customUri: `${articleUri}` });

    if (!article) throw new ResourceNotFound('Artigo não encontrado');

    return Article.aggregate([
      {
        $match: {
          _id: { $ne: article._id },
          $and: [
            {
              $or: [{ state: 'published' }, { state: 'boosted' }]
            }
          ],
          $or: [
            {
              $and: [{ themeId: article.get('themeId') }, { themeId: { $ne: null } }]
            },
            {
              $and: [{ categoryId: article.get('categoryId') }, { categoryId: { $ne: null } }]
            }
          ]
        }
      },
      {
        $sort: { publishedAt: -1, boostedAt: -1 }
      }
    ]);
  }
}

export default ArticleRepository;
