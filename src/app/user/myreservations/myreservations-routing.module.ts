import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyreservationsComponent } from './myreservations.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component:  MyreservationsComponent}
    ])],
    exports: [RouterModule]
})
export class MyreservationsRoutingModule { }