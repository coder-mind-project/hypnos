import { Document } from "mongoose";
import IComment from "../entities/IComment";

interface ICommentService {
    getByArticleUri(uri: string, skip?: number, take?: number): Promise<any[]>;
    saveComment(commentModel: IComment, customUri: string): Promise<Document>;
}

export default ICommentService;