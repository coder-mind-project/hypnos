import { Document, Model, Types } from 'mongoose'

class BaseRepository {
  _model: Model<Document>

  constructor(model: Model<Document>) {
    this._model = model
  }

  get(skip: number = 0, limit: number = 10, query: any = null) {
    return this._model.find(query).skip(skip).limit(limit)
  }

  getOne(id: Types.ObjectId | String) {
    return this._model.findById(id)
  }

  create(model: Object) {
    return new this._model(model).save()
  }
}

export default BaseRepository
