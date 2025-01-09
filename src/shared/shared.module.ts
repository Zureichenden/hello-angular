import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    TooltipModule,
    ButtonsModule,
    AlertModule,
    ModalModule
  ]
})
export class SharedModule { }