import { Livre } from "./Livre";
import { User } from "./User";

export class Emprunt {
    idEmprunt: number;
    dateDebut: string;
    dateFin: string;
    etat: boolean;
    user: User;
    livre: Livre;
  }