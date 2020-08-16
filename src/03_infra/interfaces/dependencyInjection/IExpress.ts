import { Express } from 'express'

import IArticleService from '../../../02_domain/interfaces/services/IArticleService'
import IThemeService from '../../../02_domain/interfaces/services/IThemeService'
import ICommentService from '../../../02_domain/interfaces/services/ICommentService'
import IUnitOfWork from '../IUnitOfWork'
import ISMTPService from '../services/smtp/IsmtpService'
import IContactService from '../../../02_domain/interfaces/services/IContactService'

interface IExpress extends Express {
  unitOfWork: IUnitOfWork;
  articleService: IArticleService;
  themeService: IThemeService;
  commentService: ICommentService;
  contactService: IContactService;
  smtpService: ISMTPService;
}

export default IExpress;
