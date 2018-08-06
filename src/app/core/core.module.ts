import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContactsService} from './contacts.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ContactsService]
})
export class CoreModule { }
