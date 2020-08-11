import { Express } from "express";
import IExpress from '../interfaces/dependencyInjection/IExpress';

import UnitOfWork from '../unitOfWork';
import ArticleService from '../../02_domain/services/articleService';
import ThemeService from '../../02_domain/services/themeService';
import CommentService from '../../02_domain/services/commentService';

class DependencyInjection {
  static configure(express: Express) {
    express.set('unitOfWork', new UnitOfWork())
    express.set('articleService', new ArticleService(<IExpress>express))
    express.set('themeService', new ThemeService(<IExpress>express))
    express.set('commentService', new CommentService(<IExpress>express))
  }
}

export default DependencyInjection