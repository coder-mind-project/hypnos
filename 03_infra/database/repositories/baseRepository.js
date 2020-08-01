class BaseRepository {
  constructor(model) {
    this._model = model
  }

  get(skip = 0, take = 10, query = null) {
    return this._model.find().skip(skip).limit(take)
  }

  getOne(id) {
    return this._model.findById(id)
  }

  create(model) {
    return new this._model(model).save()
  }
}

module.exports = BaseRepository
