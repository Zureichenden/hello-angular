import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private _router:Router){}
  canActivate() {

      const token = localStorage.getItem('token');
          
      if(!token){
        return true;
      }
      this._router.navigateByUrl('/dashboard')
      return false;

  }


}
