import { Track } from "./track";

export interface Comment {
    idComment: number;
    track: Track;
    user: string;
    text: string;
    score: number;
}