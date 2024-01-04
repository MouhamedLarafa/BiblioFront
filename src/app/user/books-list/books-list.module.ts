import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListRoutingModule } from './books-list-routing.module';
import { BooksListComponent } from './books-list.component';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        CommonModule,
        BookListRoutingModule,
        FormsModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
		ToolbarModule,
        ToastModule,
        DialogModule,
        InputNumberModule,
        CalendarModule,
        InputTextareaModule,
        
    ],
    declarations:[BooksListComponent]
})
export class BookListModule { }