import { Schema, Types, Model, model } from 'mongoose'
import ICategory from '../interfaces/models/ICategory'

/**
 * @description The Category Schema
 * @type {Schema}
 */
const categorySchema = new Schema({
  _id: { type: Types.ObjectId, auto: true },
  name: { type: String, unique: true },
  themeId: { type: Types.ObjectId, required: true },
  alias: String,
  description: String,
  state: { type: String, required: true, default: 'active' }
})

const Category: Model<ICategory> = model('categories', categorySchema)

export default Category
