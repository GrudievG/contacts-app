import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import {ContactsService} from '../core/contacts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  get firstName() {
    return this.form.get('name.first');
  }

  get lastName() {
    return this.form.get('name.last');
  }

  get phone() {
    return this.form.get('phone') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private contactsService: ContactsService) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }),
      phone: this.formBuilder.array([
        this.formBuilder.control('', Validators.required)
      ])
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

  onSubmit() {
    this.contactsService.addContact(this.form.value);
    this.location.back();
  }

}
