import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getCurrentUser();
  const requiredRole = route.data['role'];

  if (!currentUser) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}; 