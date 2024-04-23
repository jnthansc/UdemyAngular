import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { Actions, ofType } from '@ngrx/effects';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { of } from 'rxjs';

export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  store: Store<fromApp.AppState> = inject(Store),
  actions$: Actions = inject(Actions)
) => {
  return store.select('recipes').pipe(
    take(1),
    map((recipesState) => recipesState.recipes),
    switchMap((recipes) => {
      if (recipes.length === 0) {
        store.dispatch(RecipeActions.fetchRecipes());
        return actions$.pipe(
          ofType(RecipeActions.setRecipes),
          take(1),
          switchMap((recipeState) => of(recipeState.recipes))
        );
      } else {
        return of(recipes);
      }
    })
  );
};
