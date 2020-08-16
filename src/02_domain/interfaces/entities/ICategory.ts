import { Document, Types } from 'mongoose';

interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  themeId: Types.ObjectId;
  alias: string;
  description: string;
  state: string;
}

export default ICategory;
