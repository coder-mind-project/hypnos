import { Document, Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  gender: string;
  birthDate: Date;
  profilePhoto: string;
  instagram: string;
  twitter: string;
  github: string;
  youtube: string;
  email: string;
  cellphone: string;
  address: string;
  number: number;
  password: string;
  token: string;
  tagAdmin: string;
  occupation: string;
  especiality: string;
  tagAuthor: string;
  customUrl: string;
  publicProfile: boolean;
  platformStats: boolean;
  confirmEmail: string;
  confirmEmailToken: string;
  lastEmailTokenSendAt: number;
  firstLoginAt: Date;
  deletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
