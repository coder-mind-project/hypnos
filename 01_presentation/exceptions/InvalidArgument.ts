import BaseError from './IErrorException'
import IErrorException from './IErrorException'

class InvalidArgument extends Error implements IErrorException {
  statusCode: number
  stackError?: string

  constructor(msg: string) {
    super()
    this.message = msg
    this.statusCode = 400
    this.stackError = this.stack
  }
}

export default InvalidArgument
