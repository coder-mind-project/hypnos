import IErrorException from './IErrorException';

class MethodNotAllowed extends Error implements IErrorException {
  public statusCode: number;

  constructor(msg: string) {
    super();
    this.message = msg;
    this.statusCode = 405;
  }
}

export default MethodNotAllowed;
