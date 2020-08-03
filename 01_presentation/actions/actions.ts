import { Express } from 'express'

import ArticleActions from './articleAction'
import ThemeActions from './themeAction'

class Actions {
  static configure(express: Express) {
    new ArticleActions(express)
    new ThemeActions(express)
  }
}

export default Actions
