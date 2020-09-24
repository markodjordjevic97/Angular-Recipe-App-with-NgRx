import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeComponent} from "./recipe.component";
import {authGuard} from "../auth/auth-guard";
import {recipeResolverService} from "../shared/recipe-resolver.service";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";


const routes: Routes = [
  {path: '', component: RecipeComponent, canActivate: [authGuard], resolve: {res: recipeResolverService},  children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit',  component: RecipeEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecipeRoutingModule {

}
