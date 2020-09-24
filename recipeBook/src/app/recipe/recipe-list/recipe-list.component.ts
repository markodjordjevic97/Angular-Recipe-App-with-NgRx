import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {firebaseService} from "../../shared/firebase.service";
import {MessageService} from "../../shared/message.service";
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as recipesActions from '../store/recipe.actions';
import {map} from "rxjs/operators";
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private firebase: firebaseService,
              private message: MessageService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('recipes')
      .pipe(
        map(recipeState => {
          return recipeState.recipes;
        })

      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onSave() {
    this.store.dispatch(new recipesActions.StoreRecipes());
    this.message.sendMessage('Your recipes have been successfully preserved!');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
