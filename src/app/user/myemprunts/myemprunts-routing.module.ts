import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyempruntsComponent } from './myemprunts.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component:  MyempruntsComponent}
    ])],
    exports: [RouterModule]
})
export class MyempruntsRoutingModule { }