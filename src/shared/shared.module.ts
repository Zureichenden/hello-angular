import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [
    TooltipModule,
    ButtonsModule,
    AlertModule
  ]
})
export class SharedModule { }