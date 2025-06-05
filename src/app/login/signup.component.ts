import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  @Output() closeModal = new EventEmitter<void>();

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const userData: Partial<User> = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: 'student' as const
    };

    this.authService.signup(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeModal.emit();
      },
      error: (error: string) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    });
  }

  close(): void {
    this.closeModal.emit();
  }
} 