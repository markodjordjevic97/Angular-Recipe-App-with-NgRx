import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../recipe/recipe.model';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {firebaseService} from './firebase.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as recipesActions from '../recipe/store/recipe.actions'
import {Actions, ofType} from "@ngrx/effects";
import {map, switchMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class recipeResolverService implements Resolve<Recipe[]> {

  constructor(
              private firebase: firebaseService,
              private store: Store<fromApp.AppState>,
              private actions$: Actions) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {

    return this.store.select('recipes').pipe(
      take(1),
      map(recipeState => {
        return recipeState.recipes;
      }),
      switchMap(recipes => {
        if(recipes.length === 0){
          this.store.dispatch(new recipesActions.FetchRecipes());
          return  this.actions$.pipe(
            ofType(recipesActions.SET_RECIPE),
            take(1)
          );
        }
        else {
          return of(recipes);
        }
      })
    )
  }
}
