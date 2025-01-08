import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './component/user/user-registration/user-registration.component';
import { LoginComponent } from './login/login.component'; 

export const routes: Routes = [
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: LoginComponent },  // Agregar la ruta para el login
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
