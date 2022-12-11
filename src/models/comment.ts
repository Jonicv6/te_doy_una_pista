import { SportCenter } from "./sportcenter";

export interface Comment {
    idComment: number;
    sportCenter: SportCenter;
    user: string;
    comment: string;
    score: number;
}