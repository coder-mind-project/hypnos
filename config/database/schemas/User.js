const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

/**
 * @description The User Schema
 * @type {mongoose.Schema}
 */
const user = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.ObjectId, auto: true },
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

user.plugin(validator)
user.pre('updateOne', function (next) {
  this.options.runValidators = true
  this.options.context = 'query'
  next()
})

module.exports = mongoose.model('users', user)
