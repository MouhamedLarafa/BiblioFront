import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    tieredItems: MenuItem[] = [];


    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public route : Router, public layoutService: LayoutService) { }

    ngOnInit(){
        this.tieredItems = [
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'My reservations',
                        icon: 'pi pi-fw pi-cog',
                        command: () => {
                            this.goToreservation();
                        }
                    },
                    {
                        label: 'Billing',
                        icon: 'pi pi-fw pi-file'
                    }
                ],
                
            }
        ];
    }

    goToreservation(){
        this.route.navigateByUrl['/User/myreservations']
    }
}
