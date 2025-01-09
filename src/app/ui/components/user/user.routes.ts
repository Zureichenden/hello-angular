import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component'; 

export const USER_ROUTES: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];