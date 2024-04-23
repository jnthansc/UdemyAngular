import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-6d849-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipeActions.setRecipes({ recipes: recipes });
      })
    )
  );

  saveRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http.put(
            'https://ng-course-recipe-book-6d849-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipesState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
