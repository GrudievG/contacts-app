import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import {ContactsComponent} from './contacts.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ContactItemComponent } from './contact-item/contact-item.component';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule
  ],
  declarations: [
    ContactsComponent,
    SearchInputComponent,
    ContactItemComponent
  ]
})
export class ContactsModule { }
