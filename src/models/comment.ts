import { Track } from "./track";

export interface Comment {
    idComment?: number;
    track: Track;
    user: string;
    date: string;
    text: string;
    score: number;
}