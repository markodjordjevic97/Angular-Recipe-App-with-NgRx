import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list.component";
import {authGuard} from "../auth/auth-guard";
import {ShoppingListResolverService} from "./shoppingList-resolver.service";

const routes: Routes = [
  {path: '', component: ShoppingListComponent, canActivate: [authGuard], resolve: {res: ShoppingListResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class shoppingRoutingModule {}
