import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BooksListComponent } from './books-list.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component:  BooksListComponent}
    ])],
    exports: [RouterModule]
})
export class BookListRoutingModule { }