import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import {NgForm , FormGroup, FormControl, FormArray, Validators} from '@angular/forms'
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  id : number;
  editMode = false

  //recipe : Recipe[]

  recipeForm : FormGroup

  constructor(private activatedRoute: ActivatedRoute, private recipeService : RecipeService, private route : Router){}

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(
        (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.initForm()
        })       
  }

  private initForm(){
    let recipeName = ''
    let recipeDescription = ''
    let recipeImagePath = ''
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name
      recipeDescription = recipe.description
      recipeImagePath = recipe.imagePath

      if(recipe['ingredient']){
        for(let ingredient of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup(
            {
            'name' : new FormControl(ingredient.name, Validators.required),
            'amount' : new FormControl(ingredient.amount,[
              Validators.required,
              Validators.pattern(/[1-9]+[0-9]*$/)
            ])
          })
        );
      }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'ingredients' : recipeIngredients
    })
  }

  onSubmit(){

    let choice = confirm('Do you want to make these changes to your Recipe.?')

    if(choice){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'])

      if(this.editMode){
        this.recipeService.updateRecipe(this.id, newRecipe)
        
      }else {
        this.recipeService.addRecipe(newRecipe)
      }      
    }

    this.onCancel()    
  }

  get controls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(),
        'amount' : new FormControl()
      })
    )
  }

  onCancel(){
    this.route.navigate(['../'], {relativeTo : this.activatedRoute})
  }

  clearIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
