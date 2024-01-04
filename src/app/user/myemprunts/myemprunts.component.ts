import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Emprunt } from 'src/app/Models/Emprunt';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './myemprunts.component.html',
})
export class MyempruntsComponent {


  emprunts!:Emprunt[];

  constructor(private datePipe: DatePipe, private router: Router, private productService: ProductService, public layoutService: LayoutService, private authService: AuthenticationService) {}

  ngOnInit() {
    if(!localStorage.getItem('authToken')){
      this.router.navigate(['/Authentification/login']);
    }

    this.authService.getEmpruntsUser().subscribe(data =>this.emprunts=data);

  }


}
