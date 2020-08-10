import { Schema, Types, Model, model } from 'mongoose'
import IUser from '../interfaces/entities/IUser'

/**
 * @description The User Schema
 * @type {Schema}
 */
const user = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    name: String,
    gender: String,
    birthDate: Date,
    profilePhoto: String,
    instagram: String,
    twitter: String,
    github: String,
    youtube: String,
    email: { type: String, unique: true },
    cellphone: { type: String },
    address: String,
    number: Number,
    password: String,
    token: String,
    tagAdmin: String,
    occupation: String,
    especiality: String,
    tagAuthor: String,
    customUrl: { type: String, unique: true },
    publicProfile: { type: Boolean, default: false },
    platformStats: { type: Boolean, default: false },
    confirmEmail: String,
    confirmEmailToken: String,
    lastEmailTokenSendAt: Number,
    firstLoginAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

const User: Model<IUser> = model('users', user)

export default User
