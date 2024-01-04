import { Emprunt } from "./Emprunt";
import { Reservation } from "./Reservation";
import { Role } from "./Role";

export class User {
    idUser!: number;
    nom!: string;
    prenom!: string;
    role!: Role;
    dateNaissance!: string;
    adresse!: string;
    email!: string;
    password!: string;
    numTel!: string;
    image!:ArrayBuffer;
    card!:ArrayBuffer;
    emprunts!: Emprunt[];
    reservations!: Reservation[];
  }