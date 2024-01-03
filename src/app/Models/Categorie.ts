import { Livre } from "./Livre";

export class Categorie {
  idCategorie!: number;
  nomCategorie!: string;
  livres!: Livre[];
}