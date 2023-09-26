import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes : Recipe[];

  private mySubscription : Subscription;

  constructor(private  recipeService : RecipeService /*private activatedRoute : ActivatedRoute*/){}

 //@Output() recipeWasSelected = new EventEmitter<Recipe>();

  // onRecipeSelected(recipe: Recipe){
  //   this.recipeWasSelected.emit(recipe);
  // }

  ngOnInit(): void {

    this.mySubscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    )
      this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
      this.mySubscription.unsubscribe()
  }

}
