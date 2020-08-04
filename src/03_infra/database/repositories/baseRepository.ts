import mongoose from 'mongoose'

class BaseRepository {
  _model: mongoose.Model<mongoose.Document>

  constructor(model: mongoose.Model<mongoose.Document>) {
    this._model = model
  }

  get(skip: number = 0, take: number = 10, query: any = null) {
    return this._model.find(query).skip(skip).limit(take)
  }

  getOne(id: mongoose.Types.ObjectId | String) {
    return this._model.findById(id)
  }

  create(model: Object) {
    return new this._model(model).save()
  }
}

export default BaseRepository
