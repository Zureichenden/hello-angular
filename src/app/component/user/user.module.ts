import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationComponent } from './user-registration/user-registration.component'; 
import { SharedModule } from '../../../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserRegistrationComponent
  ],
  exports: [UserRegistrationComponent]
})
export class UserModule { }