import { Document, Types } from 'mongoose'

interface IView extends Document {
  _id: Types.ObjectId;
  reader: string;
  articleId: Types.ObjectId;
  accessCount: Number;
  createdAt: Date;
  updatedAt: Date;
}

export default IView
