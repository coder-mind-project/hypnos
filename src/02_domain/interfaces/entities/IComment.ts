import { Document, Types } from 'mongoose';

interface IComment extends Document {
  _id: Types.ObjectId;
  userName: string;
  userEmail: string;
  userId: Types.ObjectId;
  message: string;
  articleId: Types.ObjectId;
  state: string;
  confirmedAt: Date;
  readedAt: Date;
  answerOf: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default IComment;
