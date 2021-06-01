import { Livre } from './livre';
import { Usager } from './usager';

export interface Reservation {
    id: number,
    livre: Livre,
    usager: Usager,
    date: Date,
    dateLimit: Date,
    actif: Boolean,
    place?: number,
}
