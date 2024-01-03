import { Categorie } from "./Categorie";
import { Emprunt } from "./Emprunt";

export class Livre {
    idLivre: number;
    titre: string;
    isbn: number;
    nomAuteur: string;
    nbExemplaire: number;
    nbExemplaireEmprinte: number;
    datePublication: string;
    image!: ArrayBuffer;
    emprunt: Emprunt[];
    categorie: Categorie;
  }