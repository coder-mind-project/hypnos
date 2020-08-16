import IErrorException from './IErrorException';

class NotAuthorized extends Error implements IErrorException {
  public statusCode: number;

  constructor(msg: string) {
    super();
    this.message = msg;
    this.statusCode = 401;
  }
}

export default NotAuthorized;
