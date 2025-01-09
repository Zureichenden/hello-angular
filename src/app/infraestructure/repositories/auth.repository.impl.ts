import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'app/domain/models/login.model'; 
import { API_CONFIG } from 'app/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = API_CONFIG.baseUrl + API_CONFIG.endpoints.auth;

  constructor(private http: HttpClient) {}

  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }
}
