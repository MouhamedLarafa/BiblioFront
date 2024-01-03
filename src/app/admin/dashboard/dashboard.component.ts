import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { Categorie } from 'src/app/Models/Categorie';
import { Livre } from 'src/app/Models/Livre';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { map } from 'rxjs/operators';
import { Emprunt } from 'src/app/Models/Emprunt';
import { Reservation } from 'src/app/Models/Reservation';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {


  items!: MenuItem[];

  products!: Product[];


  chartData: any;

  chartOptions: any;

  subscription!: Subscription;



  
  books!: Livre[];
  book!:Livre;
  user!: User;
  NbEmprunt!: number;
  nbEmpruntMois!: number;
  nbReservationMois!: number;
  nbReservationEnAttente!: number;
  nbLivreTotal!: number;
  submitted:boolean = false;
  bookDialog: boolean = false;
  CategoryDialog: boolean = false;

  empruntDialog: boolean = false;
  reservationDialog: boolean = false;
  pubDate!: Date;
  file!: File;
  message: string;
  mess: boolean = false;
  categories!:Categorie[];
  categorie!:Categorie;
  booksAndCopies: Map<string, Map<string, number>> = new Map();
  users!:User[];
  empruntsuser!:Emprunt[];
  resrevationuser!:Reservation[];
  c!:Categorie;


  constructor(private datePipe: DatePipe, private router: Router, private productService: ProductService, public layoutService: LayoutService, private authService: AuthenticationService) {
    
  }

  ngOnInit() {
    if (localStorage.getItem('role') ==='') {
      this.router.navigate(['/Authentification/login']);
    }
    else if (localStorage.getItem('role') != "ADMIN") {
      this.router.navigate(['/notfound']);
    }

    this.authService.retrieveAllLivres().subscribe(data => this.books = data);
    this.authService.retrieveAllCategories().subscribe(data => this.categories = data);

    this.authService.getNbEmprunt().subscribe(data => this.NbEmprunt = data);
    this.authService.getNbEmpruntMois().subscribe(data => this.nbEmpruntMois = data);
    this.authService.getNbReservationMois().subscribe(data => this.nbReservationMois = data);
    this.authService.getNbReservationEnAttente().subscribe(data => this.nbReservationEnAttente = data);
    this.authService.getNbLivreTotale().subscribe(data => this.nbLivreTotal = data);

    this.authService.getBooksAndCopies()
    .pipe(
      map(data => {
        return data;
      })
    )
    .subscribe(
      result => {
        this.booksAndCopies = result;
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération des données.', error);
      }
    );

    this.authService.getAllUsers().subscribe(data => this.users = data);

  }

  getEmprunts(id :number){
    this.authService.getEmpruntsByUser(id).subscribe(data => this.empruntsuser = data);
    this.empruntDialog = true;
  }

  getReservation(id :number){
    this.authService.getReservationsByUser(id).subscribe(data => this.resrevationuser = data)
    this.reservationDialog =true;
  }

  openNewCategory(){
    this.c = new Categorie;
    this.CategoryDialog= true;
  }

  hideDialogCategory(){
    this.c = null;
    this.CategoryDialog= false;
  }

  editCategory(cat : Categorie){
    this.c = cat;
    this.CategoryDialog=true;
  }

  deleteCategory(id : number){
    this.authService.deleteCategorie(id).subscribe(data => window.location.reload());
    this.CategoryDialog=false;
  }

  saveCategory(){
    this.authService.addOrUpdateCategorie(this.c).subscribe(data => window.location.reload());
    this.CategoryDialog=false;
  }

  openNew(){
    this.book = new Livre;
    this.submitted = false;
    this.bookDialog = true;
  }

  hideDialog(){
    this.bookDialog = false;
    this.submitted = false;
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  save(){
    this.submitted=true;
    if(!this.book.idLivre){
      var dateP = new Date(this.pubDate);
      const formattedDate = this.datePipe.transform(dateP, "yyyy-MM-dd")
      this.book.datePublication = formattedDate;
      this.authService.addOrUpdateLivre(this.book,this.categorie.idCategorie, this.file).subscribe(data => window.location.reload());
    }
    else{
      this.authService.addOrUpdateLivreee(this.book).subscribe(data => window.location.reload());

    }
    this.bookDialog=false;
    this.book=null;
  }

  delete(id:number){
    this.authService.deleteLivre(id).subscribe();
    const index = this.books.findIndex(book => book.idLivre === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
    this.bookDialog=false;
    this.book=null;  
  }
}
