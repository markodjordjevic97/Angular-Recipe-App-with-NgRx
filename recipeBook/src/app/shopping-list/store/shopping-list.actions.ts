
import {Action} from '@ngrx/store';
import {Ingredient} from '../../shared/ingredient.model';

export const ADD_INGREDIENT = '[Shopping list] ADD_INGREDIENT';
export const UPDATE_INGREDIENT = '[Shopping list] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[Shopping list] DELETE_INGREDIENT';

export const START_EDIT = '[Shopping list] START_EDIT';
export const STOP_EDIT = '[Shopping list] STOP_EDIT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public  payload: Ingredient) {
  }
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {
  }
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type shoppingType =
    AddIngredient
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
