import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../domain/models/user.model';
import { UserService } from 'app/infraestructure/repositories/user.repository.impl'; 
import Swal from 'sweetalert2';  // Importar SweetAlert2

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService  // Inyectar el servicio
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  // Método para registrar un usuario
  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;

      // Llamar al servicio para registrar el usuario
      this.userService.registerUser(user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);

          // Mostrar un SweetAlert con un mensaje de éxito
          Swal.fire({
            title: 'Success!',
            text: 'User registered successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error registering user:', error);

          // Mostrar un SweetAlert con un mensaje de error
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue registering the user.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }

  // Método para obtener todos los usuarios
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        console.log('All users:', users);  // Imprime los usuarios en la consola
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
