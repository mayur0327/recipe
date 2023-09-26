import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageService : DataStorageService, private recipeService : RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

        const recipeList = this.recipeService.getRecipes();
        
        if(recipeList.length === 0){
            return this.dataStorageService.fetchRecipe()
        }else {
            return recipeList
        }
        
    }

}