import { Track } from "./track";

export interface Reserve{
    idReserve: number;
    track: Track;
    date: string;
    hour: string;
    user: string;
}
