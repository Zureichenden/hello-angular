import { Observable } from 'rxjs';
import { User } from '../models/user.model'; 

export interface AuthRepository {
  login(email: string, password: string): Observable<User>;
  register(user: User): Observable<User>;
}

