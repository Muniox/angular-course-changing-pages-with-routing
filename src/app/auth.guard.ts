import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (await authService.isAuthenticated()) {
    return true;
  } else {
    await router.navigate(['/']);
  }
};


// https://blog.angular.io/advancements-in-the-angular-router-5d69ec4c032
