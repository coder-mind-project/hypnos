import IArticleRepository from "./repositories/IArticleRepository";
import ICommentRepository from "./repositories/ICommentRepository";
import IThemeRepository from "./repositories/IThemeRepository";
import IViewRepository from "./repositories/IViewRepository";
import ILikeRepository from "./repositories/ILikeRepository";

interface IUnitOfWork {
    articleRepository: IArticleRepository
    themeRepository: IThemeRepository
    commentRepository: ICommentRepository
    viewRepository: IViewRepository
    likeRepository: ILikeRepository
}

export default IUnitOfWork