import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  id: number;
  

  constructor(private recipeService : RecipeService, private activatedService: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
      //this.recipe = this.recipeService.getRecipes();
      // const id = this.activatedService.snapshot.params['id'];

      // this.recipe = this.recipeService.getRecipesById(+id);

      this.activatedService.params.subscribe(
        (params : Params) => {
        //this.recipe = this.recipeService.getRecipesById(params[+'id'])

        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        })
  }

  //dropdown = document.querySelector('.dropdown');
  //dropdown.html..add('show');

  onAddToShoppingList(){
    this.recipeService.sendIngredients(this.recipe.ingredient);
  }

  onEditRecipe(){
    //this.router.navigate(['edit'], {relativeTo : this.activatedService} ); //this is simple way
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedService}) //this is more complex manner
  }

  onDeleteRecipe(){

    let choice = confirm('Do you want to delete the Recipe from the list..?');

    if(choice){
      this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'], {relativeTo: this.activatedService})
    }else{

    }
    
  }
}
