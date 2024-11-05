import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isLoggedIn = false; // Modify this as needed for real authentication

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // Call this method to set the login status after successful login
  login() {
    this.isLoggedIn = true;
  }
}
