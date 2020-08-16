import { Schema, Types, Model, model } from 'mongoose';
import ITheme from '../interfaces/entities/ITheme';

const themeSchema = new Schema({
  _id: { type: Types.ObjectId, auto: true },
  name: { type: String, unique: true, required: true },
  alias: String,
  description: String,
  state: { type: String, default: 'active' }
});

const Theme: Model<ITheme> = model('themes', themeSchema);

export default Theme;
