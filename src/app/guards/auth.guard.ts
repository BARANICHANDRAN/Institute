import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getCurrentUser();
  const requiredRole = route.data['role'];

  // If not authenticated, redirect to login
  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  // If role is required and user doesn't have it, redirect to login
  if (requiredRole && currentUser.role !== requiredRole) {
    router.navigate(['/login']);
    return false;
  }

  // If user is authenticated and has required role (if any), allow access
  return true;
}; 