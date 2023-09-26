import {EventEmitter, Injectable} from '@angular/core'
import { Recipe } from "./recipe.model";
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoppingService : ShoppingListService){}

  private recipes : Recipe[] = []

  // private recipes : Recipe[] = [
  //       new Recipe('Custard', 
  //       'Sweet Dish made of fruits',
  //       'https://cdn.pixabay.com/photo/2017/06/11/17/11/custard-2392924_1280.jpg',
  //       [
  //         new Ingredients('Milk', 1),
  //         new Ingredients('Sugar', 23)
  //       ]),
  //       new Recipe('Gulab Jamun',
  //       'Sweet Dish made of milk products',
  //       'https://www.jcookingodyssey.com/wp-content/uploads/2022/01/gulab-jamun-2-1024x1536.jpg.webp',
  //       [
  //         new Ingredients('Water', 20),
  //         new Ingredients('Cardamon', 5),
  //         new Ingredients('abcdefghijklmnopqrstu', 16)
  //       ])
  //     ];

      // getRecipes(id: number){
      //   const newRecipe = this.recipes.find(
      //     (r) => {
      //       return r.id ===id;
      //     }
      //   );

      //   return newRecipe;
      // }

      getRecipes(){
        return this.recipes.slice();
      }

      setRecipe(recipe : Recipe[]){
        this.recipes = recipe
        this.recipeChanged.next(this.recipes.slice())
      }

      sendIngredients(ingredient : Ingredients[]){
        this.shoppingService.displayRecipeIngredient(ingredient);
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice())
      }

      updateRecipe(index:number, newRecipe : Recipe){
        this.recipes[index] = newRecipe
        this.recipeChanged.next(this.recipes.slice())
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice())
      }

      deleteIngredients(index : number){
        this.recipes
      }
    }