import { Schema, Types, Model, model } from 'mongoose';
import IView from '../interfaces/entities/IView';

const viewSchema = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    reader: { type: String, required: true },
    articleId: { type: Types.ObjectId, required: true },
    accessCount: { type: Number, default: 1, required: true, min: 1 }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

const View: Model<IView> = model('views', viewSchema);

export default View;
