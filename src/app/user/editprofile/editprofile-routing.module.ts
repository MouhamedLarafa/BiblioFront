import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditprofileComponent } from './editprofile.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component:  EditprofileComponent}
    ])],
    exports: [RouterModule]
})
export class EditprofileRoutingModule { }