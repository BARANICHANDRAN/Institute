import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserKey = 'currentUser';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Check if user is already logged in
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      this.router.navigate([currentUser.role === 'admin' ? '/admin' : '/student']);
    }
  }

  login(email: string, password: string): Observable<User> {
    // For now, return mock data since we don't have a backend
    // Determine role based on email (this is just for demo purposes)
    const isAdmin = email.toLowerCase().includes('admin');
    const mockUser: User = {
      id: isAdmin ? 1 : 2,
      username: email.split('@')[0],
      email: email,
      firstName: isAdmin ? 'Admin' : 'Student',
      lastName: isAdmin ? 'User' : 'User',
      name: isAdmin ? 'Admin User' : 'Student User',
      role: isAdmin ? 'admin' : 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    // Store user in localStorage
    this.setCurrentUser(mockUser);
    return of(mockUser);
  }

  signup(userData: Partial<User>): Observable<User> {
    // For now, return mock data since we don't have a backend
    const mockUser: User = {
      id: 2,
      username: userData.email?.split('@')[0] || '',
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      name: `${userData.firstName} ${userData.lastName}`,
      role: 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    };

    // Store user in localStorage
    this.setCurrentUser(mockUser);
    return of(mockUser);
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.currentUserKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
} 