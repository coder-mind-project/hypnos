import { Document, Types } from 'mongoose';
import ITheme from './ITheme';

interface ICategory extends Document {
  _id: Types.ObjectId;
  name: string;
  themeId: Types.ObjectId;
  alias: string;
  description: string;
  state: string;
  theme: ITheme;
}

export default ICategory;
