import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  role: 'admin' | 'student';
  name: string;
}

interface MockUser {
  email: string;
  password: string;
  role: 'admin' | 'student';
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        const mockUsers: MockUser[] = [
          { email: 'admin@example.com', password: 'admin123', role: 'admin' as const, name: 'Admin User' },
          { email: 'student@example.com', password: 'student123', role: 'student' as const, name: 'Student User' }
        ];

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
          const userData: User = {
            email: user.email,
            role: user.role,
            name: user.name
          };
          
<<<<<<< HEAD
=======
          // Save user to localStorage
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.currentUserSubject.next(userData);
          
          observer.next(userData);
          observer.complete();
        } else {
          observer.error('Invalid credentials');
        }
      }, 1000); 
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
<<<<<<< HEAD
    this.router.navigate(['']);
=======
    this.router.navigate(['/login']);
>>>>>>> ec495df6874c4b6ecbd769d4aaf173f241055fbe
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentRole(): 'admin' | 'student' | null {
    return this.currentUserSubject.value?.role || null;
  }
} 