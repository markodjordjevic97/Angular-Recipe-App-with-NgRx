import {Actions, Effect, ofType} from '@ngrx/effects';
import * as recipesActions from './recipe.actions';
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class recipeEffects {

  @Effect()
  fetchRecipes = this.action$.pipe(
    ofType(recipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipebook-2020.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ingredients: recipe.ingredients ? recipe.ingredients : [], ...recipe};
      });
    }),
    map(recipes => {
      return new recipesActions.SetRecipes(recipes);
    })
  )

  @Effect({dispatch:false})
  storeRecipes = this.action$.pipe(
    ofType(recipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(
        'https://recipebook-2020.firebaseio.com/recipes.json',
        recipesState.recipes)
    })
  )

  constructor(private action$: Actions,
              private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

}
