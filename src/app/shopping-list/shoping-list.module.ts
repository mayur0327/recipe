import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ShoppingListRouter } from "./shopping-list.router";

@NgModule({
    declarations : [
        ShoppingListComponent,
        ShoppingEditComponent
    ],

    imports : [
        FormsModule,
        CommonModule,
        RouterModule,
        ShoppingListRouter
    ]
})

export class ShoppingListModule{}