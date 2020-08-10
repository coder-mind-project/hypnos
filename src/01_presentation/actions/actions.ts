import ArticleActions from './articleAction'
import ThemeActions from './themeAction'

import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress'

class Actions {
  static configure(express: IExpress) {
    new ArticleActions(express)
    new ThemeActions(express)
  }
}

export default Actions
