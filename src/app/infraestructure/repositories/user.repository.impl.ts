// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/domain/models/user.model'; 
import { API_CONFIG } from 'app/config/api.config'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = API_CONFIG.baseUrl + API_CONFIG.endpoints.users;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);  
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);  
  }
}
