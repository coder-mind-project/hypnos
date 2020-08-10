import IArticleRepository from "./repositories/IArticleRepository";
import ICommentRepository from "./repositories/ICommentRepository";
import IThemeRepository from "./repositories/IThemeRepository";

interface IUnitOfWork {
    articleRepository: IArticleRepository
    themeRepository: IThemeRepository
    commentRepository: ICommentRepository
}

export default IUnitOfWork