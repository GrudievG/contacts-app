import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ContactsService {
  contactList = null;

  constructor(private http: HttpClient) {}

  getContactList() {
    if (this.contactList) {
      return of(this.convert(this.contactList));
    }
    return this.http.get('assets/fake-data/contacts.json')
      .pipe(
        map(response => {
          this.contactList = response;
          return this.convert(this.contactList);
        })
      );
  }

  addContact(contact) {
    contact.id = this.contactList.length + 1;
    this.contactList.push(contact);
  }

  searchContacts(searchQuery) {
    const query = searchQuery.toLowerCase();
    const filteredList = this.contactList.filter(contact => {
      const name = contact.name.first.toLowerCase() + ' ' + contact.name.last.toLowerCase()
      const phoneNumbers = contact.phone;
      if (name.indexOf(query) !== -1) {
        return contact;
      }
      let phoneMatch = false;
      phoneNumbers.forEach(number => {
        if (number.indexOf(query) !== -1) {
          phoneMatch = true;
        }
      });
      if (phoneMatch) {
        return contact;
      }
    });
    return this.convert(filteredList);
  }

  convert(contacts) {
    const sorted = this.sort(contacts);
    return this.group(sorted);
  }

  sort(contacts) {
    return contacts.sort((a, b) => (a.name.first + ' ' + a.name.last).localeCompare(b.name.first + ' ' + b.name.last));
  }

  group(contacts) {
    const groupedCollection = {};
    contacts.forEach((el) => {
      const contact = el.name.first;
      const firstLetter = contact.charAt(0).toUpperCase();
      if (!groupedCollection[firstLetter]) {
        groupedCollection[firstLetter] = [];
      }
      groupedCollection[firstLetter].push(el);
    });
    const groupedArray = [];
    for (const key in groupedCollection) {
      const obj = {
        letter: key,
        contacts: groupedCollection[key]
      };
      groupedArray.push(obj);
    }
    return groupedArray;
  }
}
