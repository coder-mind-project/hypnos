import { Express } from 'express';

import IArticleService from '../../../02_domain/interfaces/services/IArticleService';
import IThemeService from '../../../02_domain/interfaces/services/IThemeService';
import ICommentService from '../../../02_domain/interfaces/services/ICommentService';
import IUnitOfWork from '../IUnitOfWork';
import ISMTPService from '../services/smtp/IsmtpService';
import IContactService from '../../../02_domain/interfaces/services/IContactService';
import ICategoryService from '../../../02_domain/interfaces/services/ICategoryService';

interface IExpress extends Express {
  unitOfWork: IUnitOfWork;
  articleService: IArticleService;
  themeService: IThemeService;
  commentService: ICommentService;
  contactService: IContactService;
  categoryService: ICategoryService;
  smtpService: ISMTPService;
}

export default IExpress;
