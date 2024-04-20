import {
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (
  route,
  state
): MaybeAsync<GuardResult> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().then(async (authenticated) => {
    if (authenticated) {
      return true;
    } else {
      await router.navigate(['/']);
    }
  });
};

// https://blog.angular.io/advancements-in-the-angular-router-5d69ec4c032
