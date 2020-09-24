import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {HeroPageComponent} from "./hero-page/hero-page.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {path: '', component: HeroPageComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)},
  {path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule {}
