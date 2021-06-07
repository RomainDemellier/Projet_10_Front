import { Livre } from "./livre";
import { Usager } from "./usager";
import { Exemplaire } from './exemplaire';

export interface Emprunt {
    id: number;
    usager: Usager;
    exemplaire: Exemplaire,
    dateEmprunt: Date;
    dateRetour: Date;
    prolonge: boolean;
    actif: boolean;
}
