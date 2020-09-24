import {Recipe} from "../recipe.model";
import * as recipesActions from './recipe.actions';
export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

export function recipeReducer(state: State = initialState,action: recipesActions.RecipeActions ) {
  switch (action.type) {
    case recipesActions.SET_RECIPE:
      return {
        ...state,
        recipes: [...action.payload]
      }
    case recipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case recipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.recipe};

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes
      }
    case recipesActions.DELETE_RECIPE:
      return {
      ...state,
        recipes: state.recipes.filter((recipe,index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
