import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export const recipesReducer = createReducer(
  initialState,
  on(RecipeActions.setRecipes, (state, action) => {
    return {
      ...state,
      recipes: [...action.recipes],
    };
  }),
  on(RecipeActions.addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.recipe],
    };
  }),
  on(RecipeActions.updateRecipe, (state, action) => {
    const updatedRecipe = { ...state.recipes[action.index], ...action.recipe };

    const updatedRecipes = [...state.recipes];
    updatedRecipes[action.index] = updatedRecipe;

    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),
  on(RecipeActions.deleteRecipe, (state, action) => {
    return {
      ...state,
      recipes: state.recipes.filter((recipe, index) => index !== action.index),
    };
  })
);
