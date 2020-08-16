import { DocumentQuery, Document } from 'mongoose';

interface IThemeService {
  get(skip?: number, limit?: number): DocumentQuery<Document[], Document, unknown>;
}

export default IThemeService;
