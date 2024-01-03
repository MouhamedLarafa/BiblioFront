import { Livre } from "./Livre";
import { User } from "./User";

export class Reservation {
    idReservation: number;
    dateReservation: string;
    dateDebut: string;
    dateFin: string;
    prise: boolean;
    user: User;
    livre: Livre;
  }