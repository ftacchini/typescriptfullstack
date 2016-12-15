import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from 'ng2-ui-auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    if(this.auth.isAuthenticated()){
      return true;
    }
    
    this.router.navigate([''], { queryParams: {redirectTo: state.url }});
    return false;
  }
}
