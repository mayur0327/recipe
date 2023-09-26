import { NgModule } from "@angular/core";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeService } from "./recipes/recipe.service";
import { DataStorageService } from "./shared/data-storage.service";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth/auth-interceptor.service";

@NgModule({
    providers : [
        ShoppingListService, 
        RecipeService, 
        DataStorageService, 
        RecipeResolverService, 
        AuthService, 
        AuthGuard,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi: true
  }
    ]
})

export class CoreModule {}