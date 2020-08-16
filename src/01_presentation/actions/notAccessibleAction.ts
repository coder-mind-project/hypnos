import { Request, Response, NextFunction } from 'express';
import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import MethodNotAllowed from '../exceptions/MethodNotAllowed';

class NotAccessbileAction {
  private readonly _app: IExpress;

  constructor(app: IExpress) {
    this._app = app;

    this._app.all('*', this.resourceNotAllowed);
  }

  resourceNotAllowed = (req: Request, res: Response, next: NextFunction): void => {
    try {
      throw new MethodNotAllowed('Method not allowed');
    } catch (err) {
      next(err);
    }
  };
}

export default NotAccessbileAction;
