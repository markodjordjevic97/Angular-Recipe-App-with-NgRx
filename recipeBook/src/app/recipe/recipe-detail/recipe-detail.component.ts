import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {map} from "rxjs/operators";
import * as recipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params.id;
          this.store.select('recipes').pipe(
            map(recipes => {
              return recipes.recipes;
            })
          ).subscribe(recipes => {
            this.recipe = recipes[this.id];
          })
        }
      );

  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new recipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }

}
