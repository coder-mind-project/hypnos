import BaseError from '../exceptions/IErrorException';
import { Express, Request, Response, NextFunction } from 'express';

import Logger from '../../03_infra/services/log';

class HttpStatusCodeHandler {
  static Configure(express: Express): void {
    express.use(HttpStatusCodeHandler.httpStatusCodeErrorHandler);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static httpStatusCodeErrorHandler(err: BaseError, req: Request, res: Response, next: NextFunction): void {
    if (err.statusCode) {
      res.status(err.statusCode).json(err);
    } else {
      Logger.print(err.stackError || String(err));
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default HttpStatusCodeHandler;
