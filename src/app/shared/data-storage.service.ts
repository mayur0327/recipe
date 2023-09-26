import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(private http : HttpClient, private recipeService : RecipeService, private authService : AuthService) {}

    storeRecipe(){
        const recipes = this.recipeService.getRecipes();

        this.http.put('https://recipe-book-final-a5395-default-rtdb.firebaseio.com/recipe.json', recipes).subscribe(response => {
            console.log(response)
        })
        
    }


    fetchRecipe(){
            return this.http.get<Recipe[]>('https://recipe-book-final-a5395-default-rtdb.firebaseio.com/recipe.json')
            .pipe(
            map(recipes => {
                            return recipes.map(recipe => {
                                return {
                                        ...recipe,
                                        ingredient : recipe.ingredient ? recipe.ingredient : []
                                        };
                                            })
                }),
                tap(recipes => {
                            this.recipeService.setRecipe(recipes)
                    })
                                        )
    }

}