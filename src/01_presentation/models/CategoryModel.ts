import ICategory from '../../02_domain/interfaces/entities/ICategory';
import ThemeModel from './ThemeModel';

class CategoryModel {
  public id: string;
  public description: string;
  public alias: string;
  public longDescription: string;
  public theme: ThemeModel | undefined;

  constructor(category: ICategory) {
    this.id = category?.id;
    this.description = category?.name;
    this.alias = category?.alias;
    this.longDescription = category?.description;
    this.theme = category?.theme ? new ThemeModel(category?.theme) : undefined;
  }
}

export default CategoryModel;
