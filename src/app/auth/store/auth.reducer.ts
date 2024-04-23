import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticate, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );

    return {
      ...state,
      authError: null,
      user: user,
      loading: false,
    };
  }),
  on(AuthActions.startLogin, (state, action) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(AuthActions.startSignup, (state, action) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(AuthActions.authenticateFail, (state, action) => {
    return {
      ...state,
      user: null,
      authError: action.error,
      loading: false,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(AuthActions.clearError, (state, action) => {
    return {
      ...state,
      authError: null,
    };
  })
);
