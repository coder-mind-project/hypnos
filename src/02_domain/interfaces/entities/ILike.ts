import { Document, Types } from 'mongoose';

interface ILike extends Document {
  _id: Types.ObjectId;
  reader: string;
  articleId: Types.ObjectId;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default ILike;
