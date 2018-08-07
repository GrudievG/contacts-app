import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../core/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactList;

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    this.contactsService.getContactList().subscribe((res) => {
      this.contactList = res;
    });
  }

  search(query) {
    this.contactList = this.contactsService.searchContacts(query);
  }

}
