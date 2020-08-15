import IArticleRepository from "./repositories/IArticleRepository";
import ICommentRepository from "./repositories/ICommentRepository";
import IThemeRepository from "./repositories/IThemeRepository";
import IViewRepository from "./repositories/IViewRepository";

interface IUnitOfWork {
    articleRepository: IArticleRepository
    themeRepository: IThemeRepository
    commentRepository: ICommentRepository
    viewRepository: IViewRepository
}

export default IUnitOfWork