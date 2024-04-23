import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export const addIngredient = createAction(
  '[ShoppingList] AddIngredient',
  props<{ payload: Ingredient }>()
);

export const addIngredients = createAction(
  '[ShoppingList] AddIngredients',
  props<{ payload: Ingredient[] }>()
);

export const updateIngredient = createAction(
  '[ShoppingList] UpdateIngredient',
  props<{ payload: Ingredient }>()
);

export const deleteIngredient = createAction('[ShoppingList] DeleteIngredient');

export const startEdit = createAction(
  '[ShoppingList] StartEdit',
  props<{ payload: number }>()
);

export const stopEdit = createAction('[ShoppingList] StopEdit');
