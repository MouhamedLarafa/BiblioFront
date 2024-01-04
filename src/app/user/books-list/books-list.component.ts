import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Categorie } from 'src/app/Models/Categorie';
import { Emprunt } from 'src/app/Models/Emprunt';
import { Livre } from 'src/app/Models/Livre';
import { Reservation } from 'src/app/Models/Reservation';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './books-list.component.html',
})
export class BooksListComponent {

  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  books!:Livre[];

  reservationDialog: boolean = false;

  empruntDialog: boolean = false;

  emprunt!:Emprunt;

  book!:Livre;

  reservation!:Reservation;

  startDate!:Date;

  endDate!:Date;

  categories!:Categorie[];

  c!:Categorie;

  constructor(private datePipe: DatePipe, private router: Router, private productService: ProductService, public layoutService: LayoutService, private authService: AuthenticationService) {}

  ngOnInit() {
    if(!localStorage.getItem('authToken')){
      this.router.navigate(['/Authentification/login']);
    }
    this.authService.retrieveAllLivres().subscribe(data => this.books = data);
    this.authService.retrieveAllCategories().subscribe(data => this.categories = data);

      this.sortOptions = [
          { label: 'Price High to Low', value: '!price' },
          { label: 'Price Low to High', value: 'price' }
      ];
  }
  onCategorySelect(event: any) {
    
      this.authService.retrieveAllLivresByCategorie(event.value.idCategorie).subscribe(data => this.books = data)
    
  }
  emprunter(b : Livre){
    this.book = b;
    this.emprunt = new Emprunt;
    this.empruntDialog = true;
  }


  hideEmpruntDialog(){
    this.startDate=null;
    this.endDate=null;
    this.book=null;
    this.reservation =null;
    this.reservationDialog =false;
  }

  saveEmprunt(){
    var date1 = new Date(this.startDate);
    var date2 = new Date(this.endDate);
    const formattedDate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
    const formattedDate2 = this.datePipe.transform(date2, "yyyy-MM-dd");
    this.emprunt.dateDebut=formattedDate1;
    this.emprunt.dateFin=formattedDate2;

    
    this.authService.addEmprunt(this.emprunt, this.book.idLivre).subscribe(
      (response) => {
        window.alert('Add succesfully!');
      }
    );
    this.startDate=null;
    this.endDate=null;
    this.book=null;
    this.emprunt =null;
    this.empruntDialog =false;
  }

  reserver(b : Livre){
    this.book = b;
    this.reservation = new Reservation;
    this.reservationDialog = true;
  }

  hideReservationDialog(){
    this.startDate=null;
    this.endDate=null;
    this.book=null;
    this.reservation =null;
    this.reservationDialog =false;
  }

  saveReservation(){
    var date1 = new Date(this.startDate);
    var date2 = new Date(this.endDate);
    const formattedDate1 = this.datePipe.transform(date1, "yyyy-MM-dd");
    const formattedDate2 = this.datePipe.transform(date2, "yyyy-MM-dd")
    this.reservation.dateDebut = formattedDate1;
    this.reservation.dateFin = formattedDate2;
    this.authService.addReservation(this.reservation, this.book.idLivre).subscribe(
      (response) => {
        window.alert('Add succesfully!');
      },
      (error) => {
        window.alert('Error : Dates already reserved.');
      }
    );
    this.startDate=null;
    this.endDate=null;
    this.book=null;
    this.reservation =null;
    this.reservationDialog =false;
  }

  onSortChange(event: any) {
      const value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  onFilter(dv: DataView, event: Event) {
      dv.filter((event.target as HTMLInputElement).value);
  }
}
