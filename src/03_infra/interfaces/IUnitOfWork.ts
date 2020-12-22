import IArticleRepository from './repositories/IArticleRepository';
import ICommentRepository from './repositories/ICommentRepository';
import IThemeRepository from './repositories/IThemeRepository';
import IViewRepository from './repositories/IViewRepository';
import ILikeRepository from './repositories/ILikeRepository';
import ICategoryRepository from './repositories/ICategoryRepository';

interface IUnitOfWork {
  articleRepository: IArticleRepository;
  themeRepository: IThemeRepository;
  categoryRepository: ICategoryRepository;
  commentRepository: ICommentRepository;
  viewRepository: IViewRepository;
  likeRepository: ILikeRepository;
}

export default IUnitOfWork;
