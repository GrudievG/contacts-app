import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactsService} from '../core/contacts.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  form: FormGroup;
  currentContact = {
    id: null,
    name: {
      first: '',
      last: ''
    },
    phone: ['']
  };
  headerTitle: string;
  showDeleteBtn = false;

  get firstName() { return this.form.get('name.first'); }
  get lastName() { return this.form.get('name.last'); }
  get phone() { return this.form.get('phone') as FormArray; }

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private formBuilder: FormBuilder,
    private location: Location) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.headerTitle = 'Update Contact';
      this.showDeleteBtn = true;
      const contactId = this.route.snapshot.paramMap.get('id');
      this.currentContact = this.contactsService.getContactDetail(contactId);
    } else {
      this.headerTitle = 'New Contact';
    }

    const phoneArray = this.buildControlsArray();

    this.form = this.formBuilder.group({
      name: this.formBuilder.group({
        first: [this.currentContact.name.first, Validators.required],
        last: [this.currentContact.name.last, Validators.required]
      }),
      phone: this.formBuilder.array(phoneArray)
    });
  }

  addPhone() {
    this.phone.push(this.formBuilder.control('', Validators.required));
  }

  deleteNumber(index) {
    this.phone.removeAt(index);
  }

  goBack() {
    this.location.back();
  }

  deleteContact() {
    this.contactsService.deleteContact(this.currentContact.id);
    this.location.back();
  }

  onSubmit() {
    this.currentContact.name = this.form.value.name;
    this.currentContact.phone = this.form.value.phone;
    if (!this.route.snapshot.paramMap.get('id')) {
      this.contactsService.addContact(this.currentContact);
    }
    this.location.back();
  }

  private buildControlsArray() {
    const controlsArray = [];
    this.currentContact.phone.forEach(number => {
      controlsArray.push(this.formBuilder.control(number, Validators.required));
    });
    return controlsArray;
  }

}
