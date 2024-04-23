import { createAction, props } from '@ngrx/store';

export const startSignup = createAction(
  '[Auth] Start Signup',
  props<{
    email: string;
    password: string;
  }>()
);

export const startLogin = createAction(
  '[Auth] Start Login',
  props<{
    email: string;
    password: string;
  }>()
);

export const autoLogin = createAction('[Auth] Auto Login');

export const authenticate = createAction(
  '[Auth] Authenticate',
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);

export const authenticateFail = createAction(
  '[Auth] Authenticate Fail',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const clearError = createAction('[Auth] Clear Action');
