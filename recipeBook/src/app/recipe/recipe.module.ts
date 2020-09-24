import {NgModule} from "@angular/core";
import {RecipeRoutingModule} from "./recipe-routing.module";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipeComponent} from "./recipe.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {AngularMaterial} from "../angular.material";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";


@NgModule({
  declarations: [
    RecipeComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeDetailComponent
  ],
  imports: [
    RecipeRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    AngularMaterial]
})

export class RecipeModule {

}
