import IErrorException from './IErrorException';

class InvalidArgument extends Error implements IErrorException {
  public statusCode: number;

  constructor(msg: string) {
    super();
    this.message = msg;
    this.statusCode = 400;
  }
}

export default InvalidArgument;
