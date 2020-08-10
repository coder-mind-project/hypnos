import IErrorException from './IErrorException'

class InvalidArgument extends Error implements IErrorException {
  public statusCode: number
  public stackError?: string

  constructor(msg: string) {
    super()
    this.message = msg
    this.statusCode = 400
    this.stackError = this.stack
  }
}

export default InvalidArgument
