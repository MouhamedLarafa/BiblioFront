import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'books', loadChildren: () => import('./books-list/books-list.module').then(m => m.BookListModule) },
        { path: 'myemprunts', loadChildren: () => import('./myemprunts/myemprunts.module').then(m => m.BookListModule) },
        { path: 'myreservations', loadChildren: () => import('./myreservations/myreservations.module').then(m => m.MyreservationsModule) },
        { path: 'profile', loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofileModule) },

        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})

export class UserRoutingModule {}