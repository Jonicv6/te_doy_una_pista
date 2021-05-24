import { SportCenter } from "./sportcenter";

export interface Track {
    idTrack: number;
    sportCenter: SportCenter;
    name: string;
    sport: string;
    type: string;
    price: number;
}