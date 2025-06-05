import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
  ) {}

  login(email: string, password: string): Observable<User> {
    // For now, return mock data since we don't have a backend
    return of({
      id: 1,
      username: 'admin',
      email: email,
      firstName: 'Admin',
      lastName: 'User',
      name: 'Admin User', // For backward compatibility
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    });
  }

  signup(userData: Partial<User>): Observable<User> {
    // For now, return mock data since we don't have a backend
    return of({
      id: 2,
      username: userData.email?.split('@')[0] || '',
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      name: `${userData.firstName} ${userData.lastName}`, // For backward compatibility
      role: 'student',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    });
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