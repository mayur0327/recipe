import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes : Routes = [
  { path:'', redirectTo: 'recipe', pathMatch: 'full'},
  { path : 'recipe', loadChildren : () => import('../recipes/recipes.module').then(m => m.RecipeModule)},
  { path : 'auth', loadChildren : () => import('../auth/auth.module').then(m=>m.AuthModule)},
  { 
    path : 'shopping-list', 
    loadChildren : () => import('../shopping-list/shoping-list.module').then(m => m.ShoppingListModule)
  }
 
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy : PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class RoutingModuleModule { }
