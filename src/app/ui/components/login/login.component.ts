// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';  // Importar SweetAlert2
import { AuthService } from 'app/infraestructure/repositories/auth.repository.impl';
import { Login } from '../../../domain/models/login.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      // Llamar al servicio para hacer login
      this.authService.login(loginData).subscribe(
        (response) => {
          console.log('Login successful:', response);

          // Mostrar un SweetAlert con un mensaje de éxito
          Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error during login:', error);

          // Mostrar un SweetAlert con un mensaje de error
          Swal.fire({
            title: 'Error!',
            text: 'Invalid username or password.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
}
