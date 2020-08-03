import BaseError from '../exceptions/IErrorException'
import { Express, Request, Response, NextFunction } from 'express'

import Logger from '../../03_infra/services/log'

class HttpStatusCodeHandler {
  static Configure(express: Express) {
    express.use(HttpStatusCodeHandler.httpStatusCodeErrorHandler)
  }

  static httpStatusCodeErrorHandler(err: BaseError, req: Request, res: Response, next: NextFunction) {
    if (err.statusCode) {
      res.status(err.statusCode).json(err)
    } else {
      Logger.print(err.stackError || err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default HttpStatusCodeHandler
