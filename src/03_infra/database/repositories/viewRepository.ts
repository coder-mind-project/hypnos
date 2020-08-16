import BaseRepository from './baseRepository';
import View from '../../../02_domain/entities/View';
import IViewRepository from '../../interfaces/repositories/IViewRepository';

class ViewRepository extends BaseRepository implements IViewRepository {
  constructor() {
    super(View);
  }
}

export default ViewRepository;
