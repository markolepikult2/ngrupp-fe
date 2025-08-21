import {Component, inject, signal} from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  protected readonly title = signal('ngrupp-fe-app');
  showLoginForm = false;
  username = '';
  password = '';
  loginError: string | null = null;
  isLoggedIn = false;

  private authService = inject(AuthService);

  constructor() {
    this.authService.currentRole$.subscribe(role => {
      this.isLoggedIn = role !== 'GUEST';
    });
    this.authService.username$.subscribe(name => {
      this.username = name;
    });
  }

  login() {
    this.loginError = null;
    console.log("header.ts - Attempting login with username:", this.username, "and password:", this)
    this.authService.loginWithCredentials(this.username, this.password).subscribe({
      next: (role) => {
        this.isLoggedIn = role !== 'GUEST';
        this.showLoginForm = false;
        this.password = '';
        console.log("header.ts - Login successful, role:", role);
      },
      error: (err) => {
        this.loginError = err.error?.message || 'Login failed';
      }
    });
  }

  logout() {
    this.authService.logout();
    // username will be updated by subscription
  }
}
