import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../core/contacts.service';
import {Contact} from '../models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactList: Contact[];

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContactList().subscribe((res: Contact[]) => {
      console.log(res);
      this.contactList = res;
    });
  }

}
