import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateComponent} from './create/create.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
  { path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
