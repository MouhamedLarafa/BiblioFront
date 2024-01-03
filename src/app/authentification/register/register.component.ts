import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { el } from '@fullcalendar/core/internal-common';
import { RegisterRequest } from 'src/app/Models/RegisterRequest';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  registerReq: RegisterRequest;
  file!: File;
  birth: Date;

  message: string;
  mess: boolean = false;
  constructor(private router: Router, private layoutService: LayoutService, private datePipe: DatePipe, private authService: AuthenticationService) { }

  ngOnInit() {
    this.message = null;
    this.registerReq = new RegisterRequest;
  }

  Register() {
    if (this.registerReq.nom == null) {
      this.message = "Enter your first name";
      this.mess = true;
    } else if (this.registerReq.prenom == null) {
      this.message = "Enter your last name";
      this.mess = true;
    } else if (this.registerReq.adresse == null) {
      this.message = "Enter your adress";
      this.mess = true;
    } else if (this.registerReq.numTel == null || !(/^\d{8}$/.test(this.registerReq.numTel))) {
      this.message = "Enter your phone number";
      this.mess = true;
    } else if (this.registerReq.password == null) {
      this.message = "Enter your password";
      this.mess = true;
    } else if (this.registerReq.email == null || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.registerReq.email)) {
      this.message = "Enter your email";
      this.mess = true;
    } else if (this.birth == null) {
      this.message = "Enter your birthday";
      this.mess = true;
    } else if (this.file == null) {
      this.message = "Enter your picture";
      this.mess = true;
    } else {
      var dateB = new Date(this.birth);
      const formattedDate = this.datePipe.transform(dateB, "yyyy-MM-dd")
      this.registerReq.dateNaissance = formattedDate;
      this.authService.register(this.registerReq, this.file).subscribe(
        data => {
          if (data.message == 'Add succesfully.') {
            this.router.navigate(['/Authentification/login']);

          }
          else {
            this.message = data.message;
            this.mess = true;
          }
        }

      );

    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  Login(){
    this.router.navigate(['/Authentification/login']);
  }


}
