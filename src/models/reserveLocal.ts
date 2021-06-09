import { SportCenter } from "./sportcenter";
import { Track } from "./track";

export interface ReserveLocal{
    idReserve: number;
    sportCenter: SportCenter;
    track: Track;
    date: string;
    hour: string;
    user: string;
}
