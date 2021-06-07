import { Auteur } from "./auteur";

export interface Livre {
    id: number;
    titre: string;
    auteur: Auteur;
    genre: string;
    nbreExemplaires: number;
    fullNameAuteur: string;
    reservable?: boolean;
    nbreReservations: number;
    dateRetourPlusProche?: Date;
}
