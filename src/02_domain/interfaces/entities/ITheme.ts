import { Document, Types } from 'mongoose'

interface ITheme extends Document {
  _id: Types.ObjectId;
  name: string;
  alias: string;
  description: string;
  state: string;
}

export default ITheme
