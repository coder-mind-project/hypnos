class ResourceNotFound extends Error {
  constructor(msg) {
    super()
    this.message = msg
    this.statusCode = 404
  }
}

module.exports = ResourceNotFound
