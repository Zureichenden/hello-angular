import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from './component/user/user.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SharedModule, AuthModule, UserModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello-angular';
}
