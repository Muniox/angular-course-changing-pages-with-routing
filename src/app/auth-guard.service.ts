import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    MaybeAsync<GuardResult> {

    return this.authService.isAuthenticated().then(async (authenticated) => {
      if (authenticated) {
        return true;
      } else {
        await this.router.navigate(['/']);
      }
    });
  }
}
//nie dodałem do modułu, ponieważ nie będzie w taki sposób guard pisany!

