interface IErrorException {
  statusCode: number
  message: string
  stackError?: string
}

export default IErrorException
