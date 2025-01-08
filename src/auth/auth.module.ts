import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { LoginComponent } from '../app/login/login.component'; 
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    LoginComponent,
    FormsModule,
    SharedModule
  ],
  exports: [LoginComponent]  
})

export class AuthModule {}
