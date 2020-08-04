import IErrorException from './IErrorException'

class ResourceNotFound extends Error implements IErrorException {
  statusCode: number
  stackError?: string

  constructor(msg: string) {
    super()
    this.message = msg
    this.statusCode = 404
    this.stackError = this.stack
  }
}

export default ResourceNotFound
