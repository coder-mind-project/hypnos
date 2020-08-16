import IArticle from '../interfaces/entities/IArticle';

class FoundArticles {
  public articles: IArticle[];
  public count: number;

  constructor(articles: IArticle[], count: number) {
    this.articles = articles;
    this.count = count;
  }
}

export default FoundArticles;
