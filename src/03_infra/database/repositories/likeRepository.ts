import BaseRepository from './baseRepository';
import Like from '../../../02_domain/entities/Like';
import ILikeRepository from '../../interfaces/repositories/ILikeRepository';

class LikeRepository extends BaseRepository implements ILikeRepository {
  constructor() {
    super(Like);
  }
}

export default LikeRepository;
