import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Ingredient} from "../shared/ingredient.model";
import {Observable, of} from "rxjs";
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as shopActions from '../shopping-list/store/shopping-list.actions';
import {map, switchMap, take} from "rxjs/operators";
import {Actions, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ShoppingListResolverService implements Resolve<Ingredient[]>{

  constructor(private store: Store<fromApp.AppState>,
              private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Ingredient[]> |
    Promise<Ingredient[]> |
    Ingredient[] {

    return this.store.select('shoppingList').pipe(
      take(1),
      map(ing => {
        return ing.ingredients;
      }),
      switchMap(ing => {
        if(ing.length === 0){
          this.store.dispatch(new shopActions.FetchIngredients());
          return this.actions$.pipe(
            ofType(shopActions.SET_INGREDIENTS),
            take(1)
          );
        }
        else {
          return of(ing);
        }
      })
    )
  }

}
