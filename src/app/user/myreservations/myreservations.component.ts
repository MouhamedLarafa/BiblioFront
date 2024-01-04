import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/Models/Reservation';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  templateUrl: './myreservations.component.html',
})
export class MyreservationsComponent {
  reservations!:Reservation[];

  constructor(private authService: AuthenticationService,private router: Router ) {}

  ngOnInit() {
    if(!localStorage.getItem('authToken')){
      this.router.navigate(['/Authentification/login']);
    }
    this.authService.getReservationsUser().subscribe(data =>this.reservations=data);

  }

  delete(id: number){
    this.authService.deletereservation(id).subscribe(data=> window.location.reload())
  }

}
