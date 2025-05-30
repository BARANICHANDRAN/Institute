import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';
import { SignupComponent } from './signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SignupComponent]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  showSignupModal: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (user: User) => {
        this.isLoading = false;
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/student']);
        }
      },
      error: (error: string) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    });
  }

  openSignupModal(): void {
    this.showSignupModal = true;
  }

  closeSignupModal(): void {
    this.showSignupModal = false;
  }
} 