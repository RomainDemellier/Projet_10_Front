import { Livre } from './livre';

export interface Exemplaire {
    id: number,
    livre: Livre,
    etat: String
}
