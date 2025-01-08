import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5110/api/auth'; // Asegúrate de configurar tu endpoint

  constructor(private http: HttpClient) {}

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }
}
