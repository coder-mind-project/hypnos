import { Schema, Types, Model, model } from 'mongoose';
import IArticle from '../interfaces/entities/IArticle';

const articleSchema = new Schema(
  {
    _id: { type: Types.ObjectId, auto: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: null, trim: true },
    state: {
      type: String,
      enum: ['draft', 'published', 'inactivated', 'removed', 'boosted'],
      required: true,
      default: 'draft'
    },
    themeId: { type: Types.ObjectId, default: null },
    categoryId: { type: Types.ObjectId, default: null },
    userId: { type: Types.ObjectId, required: true },
    logoImg: { type: String, default: null, trim: true },
    secondaryImg: { type: String, default: null, trim: true },
    headerImg: { type: String, default: null, trim: true },
    contentType: { type: String, required: true, enum: ['default', 'md'], default: 'default' },
    content: { type: String, default: null },
    socialVideoType: { type: String, enum: ['youtube', 'other', null], default: null },
    socialVideo: { type: String, default: null, trim: true },
    socialRepositoryType: { type: String, enum: ['github', 'gitlab', 'other', null], default: null },
    socialRepository: { type: String, default: null, trim: true },
    customUri: {
      type: String,
      required: true,
      unique: true,
      default: () => `${Date.now()}${Math.floor(Math.random() * 123555738)}`,
      trim: true
    },
    removedAt: { type: Date, default: null },
    inactivatedAt: { type: Date, default: null },
    publishedAt: { type: Date, default: null },
    boostedAt: { type: Date, default: null }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);

const Article: Model<IArticle> = model('articles', articleSchema);

export default Article;
