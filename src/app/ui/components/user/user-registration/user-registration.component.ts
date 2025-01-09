import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../domain/models/user.model';
import { UserService } from 'app/infraestructure/repositories/user.repository.impl'; 
import Swal from 'sweetalert2';  

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
    private userService: UserService  
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;

      this.userService.registerUser(user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);

          Swal.fire({
            title: 'Success!',
            text: 'User registered successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Error registering user:', error);

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

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        console.log('All users:', users);  
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
