import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../Models/AuthenticationRequest';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationResponse } from '../Models/AuthenticationResponse';
import { RegisterRequest } from '../Models/RegisterRequest';
import { User } from '../Models/User';
import { Livre } from '../Models/Livre';
import { Reservation } from '../Models/Reservation';
import { Categorie } from '../Models/Categorie';
import { Emprunt } from '../Models/Emprunt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = 'http://localhost:8081/'

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  });

  constructor(private http :HttpClient) { }

  authentificate(authReq: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.url}authentification/v1/authenticate`, authReq);
  }

  
  logout(){
    return this.http.put(`${this.url}authentification/v1/logout`, {headers : this.headers});
  }


  register(registerReq:RegisterRequest, file :File){
    const formData = new FormData();
    if(file){
      formData.append('file', file);
    }
    formData.append('register', JSON.stringify(registerReq));

    return this.http.post<any>(`${this.url}authentification/v1/register`, formData);
  }

  getConnectedUser(): Observable<User> {
    
    return this.http.get<User>(`${this.url}authentification/v1/getuser`, { headers : this.headers });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}authentification/v1/Allusers`, {headers : this.headers});
  }

  getNbEmprunt(): Observable<number> {
    return this.http.get<number>(`${this.url}stat/nbEmprunt`, { headers: this.headers });
  }

  getNbLivreTopEmprunt(): Observable<Map<Livre, number>> {
    return this.http.get<Map<Livre, number>>(`${this.url}stat/nbLivreTopEmprunt`, { headers: this.headers });
  }

  getNbEmpruntMois(): Observable<number> {
    return this.http.get<number>(`${this.url}stat/nbEmpruntMois`, { headers: this.headers });
  }

  getNbReservationMois(): Observable<number> {
    return this.http.get<number>(`${this.url}stat/nbReservationMois`, { headers: this.headers });
  }

  getNbReservationEnAttente(): Observable<number> {
    return this.http.get<number>(`${this.url}stat/nbReservationEnAttente`, { headers: this.headers });
  }

  getNbLivreTotale(): Observable<number> {
    return this.http.get<number>(`${this.url}stat/nbLivreTotale`, { headers: this.headers });
  }

  getBooksAndCopies(): Observable<Map<string, Map<string, number>>> {
    return this.http.get<Map<string, Map<string, number>>>(`${this.url}stat/booksAndCopies`, { headers: this.headers });
  }

  getNbReservationEnAttenteParBook(): Observable<Map<Livre, Reservation[]>> {
    return this.http.get<Map<Livre, Reservation[]>>(`${this.url}stat/nbReservationEnAttenteParBook`, { headers: this.headers });
  }


  addOrUpdateLivre(livre: Livre, idCategorie: number, file: File): Observable<Livre> {
    const formData = new FormData();
    formData.append('livre', JSON.stringify(livre));
    formData.append('idCategorie', idCategorie.toString());
    if (file) {
      formData.append('file', file);
    }

    return this.http.post<Livre>(`${this.url}books/addOrUpdate`, formData, { headers: this.headers });
  }

  addOrUpdateLivreee(livre: Livre): Observable<Livre> {
    const formData = new FormData();
    formData.append('livre', JSON.stringify(livre));
  
    return this.http.post<Livre>(`${this.url}books/addOrUpdate`, formData, { headers: this.headers });
  }

  deleteLivre(idLivre: number): Observable<void> {
    return this.http.delete<void>(`${this.url}books/delete/${idLivre}`, { headers: this.headers });
  }

  retrieveLivre(idLivre: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.url}books/retrieve/${idLivre}`, { headers: this.headers });
  }

  retrieveAllLivres(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.url}books/retrieveAll`, { headers: this.headers });
  }

  retrieveAllLivresByCategorie(idCategorie: number): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.url}books/retrieveByCategorie/${idCategorie}`, { headers: this.headers });
  }

  retrieveAllAllowedBooks(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.url}books/retrieveAllowedBooks`, { headers: this.headers });
  }

  
  addOrUpdateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.url}categories/addOrUpdate`, categorie, { headers: this.headers });
  }

  deleteCategorie(idCategorie: number): Observable<void> {
    return this.http.delete<void>(`${this.url}categories/delete/${idCategorie}`, { headers: this.headers });
  }

  retrieveCategorie(idCategorie: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.url}categories/retrieve/${idCategorie}`, { headers: this.headers });
  }

  retrieveAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.url}categories/retrieveAll`, { headers: this.headers });
  }

  getEmpruntsByUser(id:number):Observable<Emprunt[]>{
    return this.http.get<Emprunt[]>(`${this.url}emprunt/empruntsbyuser/${id}`, { headers: this.headers });

  }

  getReservationsByUser(id:number):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.url}reservation/reservationbyuser/${id}`, { headers: this.headers });
  }
  
  addReservation(reservation: Reservation, id: number) {
    return this.http.post<any>(`${this.url}reservation/add/${id}`, reservation, { headers: this.headers });
  }

  addEmprunt(emprunt: Emprunt, id: number) {
    return this.http.post<any>(`${this.url}emprunt/add/${id}`, emprunt, { headers: this.headers });
  }

  getEmpruntsUser(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.url}emprunt/empruntsuser`, { headers: this.headers });
  }

  getReservationsUser(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}reservation/reservationsuser`, { headers: this.headers });
  }

  deletereservation(id:number){
    return this.http.delete(`${this.url}reservation/deletereservation/${id}`, { headers: this.headers });
  }
  
  
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.url}reservation/all`, { headers: this.headers });
  }


  getAllEmprunts(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.url}emprunt/all`, { headers: this.headers });
  }

  editEmprunt(emprunt: Emprunt) {
    return this.http.put<any>(`${this.url}emprunt/edit`, emprunt, { headers: this.headers });
  }
}
