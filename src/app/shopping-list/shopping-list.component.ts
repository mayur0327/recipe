import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients : Ingredients[];

  private shopingSubs : Subscription;

  constructor(private shoppingService: ShoppingListService){}

  ngOnInit(): void {
      this.ingredients = this.shoppingService.getIngredients();
      this.shopingSubs = this.shoppingService.ingredientsChanged.subscribe(
        (ingredients : Ingredients[]) =>
        {
          this.ingredients = ingredients;
        }
      )
  }

  ngOnDestroy(): void {
      this.shopingSubs.unsubscribe()
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }

}
