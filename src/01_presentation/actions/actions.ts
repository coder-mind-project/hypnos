import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';

import ArticleActions from './articleAction';
import ThemeActions from './themeAction';
import ContactAction from './contactAction';
import CategoryAction from './categoryAction';

import NotAccessbileAction from './notAccessibleAction';

class Actions {
  static configure(express: IExpress): void {
    new ArticleActions(express);
    new ThemeActions(express);
    new ContactAction(express);
    new CategoryAction(express);

    new NotAccessbileAction(express);
  }
}

export default Actions;
