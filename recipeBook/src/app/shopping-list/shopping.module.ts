import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListEditComponent} from "./shopping-list-edit/shopping-list-edit.component";
import {shoppingRoutingModule} from "./shopping-routing.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AngularMaterial} from "../angular.material";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    shoppingRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,
    AngularMaterial]
})

export class ShoppingModule {}
