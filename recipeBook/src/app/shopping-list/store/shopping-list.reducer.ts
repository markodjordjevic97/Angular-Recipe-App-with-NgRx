import {Ingredient} from '../../shared/ingredient.model';

import * as shoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Milk', 200)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initialState, action: shoppingListActions.shoppingType) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case shoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient =  {
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case shoppingListActions.DELETE_INGREDIENT:
      return {
          ...state,
          ingredients: state.ingredients.filter((ingredient: Ingredient, index: number) => {
            return index !== state.editedIngredientIndex;
          }),
      };
    case shoppingListActions.START_EDIT:
      return{
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: {...state.ingredients[action.payload]}
      };
    case shoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
