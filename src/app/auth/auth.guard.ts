import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      take(1),
      map((authState) => authState.user),
      map((user) => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      // tap((isAuth) => {
      //   if (isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}

export const canActivateRecipes: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate();
};
