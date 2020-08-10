import IErrorException from './IErrorException'

class ResourceNotFound extends Error implements IErrorException {
  public statusCode: number

  constructor(msg: string) {
    super()
    this.message = msg
    this.statusCode = 404
  }
}

export default ResourceNotFound
