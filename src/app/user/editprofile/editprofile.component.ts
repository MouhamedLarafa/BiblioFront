import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({

  templateUrl: './editprofile.component.html',
})
export class EditprofileComponent {
  pdfSrc: string | undefined;

  user!:User;  

  constructor(private sanitizer: DomSanitizer, private authService: AuthenticationService) {}

  ngOnInit(){
    this.authService.getConnectedUser().subscribe((response) => {
      this.user=response;
     
    })
  }

  getSafeContent(): SafeResourceUrl {
    const pdfContent = this.user ? this.user.card : '';
    return this.sanitizer.bypassSecurityTrustResourceUrl(`data:application/pdf;base64,${pdfContent}`);
  }


}
