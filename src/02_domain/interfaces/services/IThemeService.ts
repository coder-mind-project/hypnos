import ITheme from '../entities/ITheme';

interface IThemeService {
  get(skip?: number, limit?: number): Promise<ITheme[]>;
}

export default IThemeService;
