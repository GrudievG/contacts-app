import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContactList() {
    return this.http.get('assets/fake-data/contacts.json');
  }
}
