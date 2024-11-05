import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AuthGuard } from '../../../app/auth.guard';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authGuard: AuthGuard) {}

  login() {
    if (this.username === 'jefe' && this.password === '117') {
      this.authGuard.login(); // Set the login status
      this.router.navigate(['/admin']);
    } else {
      alert('Usuario o contraseña incorrectos. Inténtelo de nuevo.');
    }
  }
}
