import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/Models/AuthenticationRequest';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    authReq:AuthenticationRequest;

    valCheck: string[] = ['remember'];

    password!: string;

    constructor(private router: Router, private layoutService: LayoutService ,private authService :AuthenticationService ) { }

    ngOnInit(){
      this.authReq = new AuthenticationRequest;
    }

    Login(){
      this.authService.authentificate(this.authReq).subscribe( (res) => {
        if(res.token!=null){
          localStorage.setItem('authToken', res.token); 
          this.authService.getConnectedUser().subscribe(data => {
            localStorage.setItem('role', data.role);
            console.log(localStorage.getItem('role')); 
            if(data.role=='ADMIN'){
              this.router.navigate(['/Admin/dashboard']);
            }
            else{
              this.router.navigate(['/User/books']);
            }
          })
        }
      });

      


    }

    Register(){
      this.router.navigate(['/Authentification/register']);
    }

}
