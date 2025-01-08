// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_CONFIG.baseUrl + API_CONFIG.endpoints.users;

  constructor(private http: HttpClient) { }

  // Método para obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);  // Realiza la petición GET a la API
  }

  // Método para registrar un usuario
  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);  // Enviar datos al backend
  }
}
