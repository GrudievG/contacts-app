import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactDetailComponent} from './contact-detail/contact-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
  { path: 'contact/:id', component: ContactDetailComponent },
  { path: 'create', component: ContactDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
