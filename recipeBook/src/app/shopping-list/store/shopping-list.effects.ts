import {Actions, Effect, ofType} from "@ngrx/effects";
import * as shoppingActions from './shopping-list.actions';
import {map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Ingredient} from "../../shared/ingredient.model";

@Injectable()
export class ShoppingListEffects {

  // Fetch Ingredients from Firebase
  @Effect()
  fetchIngredients = this.action$.pipe(
    ofType(shoppingActions.FETCH_INGREDIENTS),
    switchMap(() => {
      return this.http.get<Ingredient[]>(
        'https://recipebook-2020.firebaseio.com/ingredients.json'
      )
    }),
    map(ing => {
      return new shoppingActions.SetIngredients(ing);
    })
  )




  // Store Ingredients on firebase
  @Effect({dispatch: false})
  storeIngredients = this.action$.pipe(
    ofType(shoppingActions.STORE_INGREDIENTS),
    withLatestFrom(this.store.select('shoppingList')),
    switchMap(([actionData, ingredients]) => {
      return this.http.put(
        'https://recipebook-2020.firebaseio.com/ingredients.json',
        ingredients.ingredients
      )
    })
  )


  constructor(private action$: Actions,
              private store: Store<fromApp.AppState>,
              private http: HttpClient) {
  }
}
