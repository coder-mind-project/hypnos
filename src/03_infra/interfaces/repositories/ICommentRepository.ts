import { Types, Aggregate } from "mongoose";
import BaseRepository from "../../database/repositories/baseRepository";

interface ICommentRepository extends BaseRepository {
    getByArticle(articleId: Types.ObjectId | String, skip: number, limit: number): Aggregate<any>;
}

export default ICommentRepository