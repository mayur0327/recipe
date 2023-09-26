import { Component, EventEmitter, Output, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy{

  // @ViewChild('nameInput') nameInputRef : ElementRef;
  // @ViewChild('amountInput') amountInputRef : ElementRef;

  @Output() ingredient = new EventEmitter<Ingredients>();

  @ViewChild('f') slForm : NgForm

  subscription : Subscription
  editMode : boolean = true;
  editemItemIndex : number
  editedItem : Ingredients

  constructor(private shoppingService : ShoppingListService){}

  ngOnInit(): void {
      this.subscription = this.shoppingService.startedEditing.subscribe(
        (index : number) => {
          this.editemItemIndex = index
          this.editMode = true
          this.editedItem = this.shoppingService.getIngredient(index);
          this.slForm.setValue({
            name : this.editedItem.name,
            amount : this.editedItem.amount
          })
        }
      );
  }

  onAddItem(form : NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;

    const value = form.value

    const ingreDetail = new Ingredients(value.name, value.amount);

    //this.ingredient.emit(ingreDetail);

    if(this.editMode){
      this.shoppingService.updateIngredient(this.editemItemIndex, ingreDetail)
    }else {
      this.shoppingService.addIngredient(ingreDetail);
    }
    this.slForm.reset();
    this.editMode = false
   }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
  
  onClear() {
    this.slForm.reset();
    this.editMode = false
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.editemItemIndex)
    this.onClear()
  }

}
