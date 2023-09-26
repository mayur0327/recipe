import { NgModule } from "@angular/core";
import { LoadingSpinnerCOmponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations : [
        LoadingSpinnerCOmponent,
        AlertComponent,
        PlaceHolderDirective,
        DropdownDirective
    ],
    imports : [
        CommonModule
    ],
    exports : [
        AlertComponent,
        LoadingSpinnerCOmponent,
        PlaceHolderDirective,
        DropdownDirective,
        CommonModule
    ]
})

export class SharedModule {

}