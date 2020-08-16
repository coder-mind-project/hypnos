import ArticleRepository from './database/repositories/articleRepository';
import ThemeRepository from './database/repositories/themeRepository';
import CommentRepository from './database/repositories/commentRepository';
import ViewRepository from './database/repositories/viewRepository';
import LikeRepository from './database/repositories/likeRepository';

import IArticleRepository from './interfaces/repositories/IArticleRepository';
import IThemeRepository from './interfaces/repositories/IThemeRepository';
import ICommentRepository from './interfaces/repositories/ICommentRepository';
import IViewRepository from './interfaces/repositories/IViewRepository';
import ILikeRepository from './interfaces/repositories/ILikeRepository';

class UnitOfWork {
  public articleRepository: IArticleRepository;
  public themeRepository: IThemeRepository;
  public commentRepository: ICommentRepository;
  public viewRepository: IViewRepository;
  public likeRepository: ILikeRepository;

  constructor() {
    this.articleRepository = new ArticleRepository();
    this.themeRepository = new ThemeRepository();
    this.commentRepository = new CommentRepository();
    this.viewRepository = new ViewRepository();
    this.likeRepository = new LikeRepository();
  }
}

export default UnitOfWork;
