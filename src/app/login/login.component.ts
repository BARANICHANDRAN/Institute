import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
import { SignupComponent } from './signup.component';
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule,]
=======
<<<<<<< HEAD
  imports: [CommonModule, FormsModule,]
=======
  imports: [CommonModule, FormsModule, SignupComponent]
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
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
<<<<<<< HEAD
  
  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
=======
<<<<<<< HEAD
  
  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';
=======

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
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

<<<<<<< HEAD
  
=======
<<<<<<< HEAD
  
=======
  openSignupModal(): void {
    this.showSignupModal = true;
  }

  closeSignupModal(): void {
    this.showSignupModal = false;
  }
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
>>>>>>> fb9acbc5a4a316a7e7e0c1de70b2d9af38163177
} 