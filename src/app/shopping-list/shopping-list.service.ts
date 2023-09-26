
import { Ingredients } from "../shared/ingredients.model";
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredients[]>();

    startedEditing = new Subject<number>();

    private ingredients : Ingredients[] = [
        new Ingredients('Milk', 10),
        new Ingredients('Almond', 20)
      ]

      //constructor(private recipeService : RecipeService){}

      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.ingredients[index]
      }

      addIngredient(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      displayRecipeIngredient(ingredients : Ingredients[]){
        // for(let ingredient of ingredients){
        //   this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index : number, newIngredient : Ingredients){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
      }

      deleteIngredient(index: number){
        this.ingredients.splice(index,1)
        this.ingredientsChanged.next(this.ingredients.slice())
      }

}