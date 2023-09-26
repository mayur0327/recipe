import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { LoadingSpinnerCOmponent } from "../shared/loading-spinner/loading-spinner.component";
import { SharedModule } from "../shared/shared.module";


const routes : Routes = [
    {path : '', component : AuthComponent}
]

@NgModule({
    declarations : [
        AuthComponent
    ],

    imports : [RouterModule.forChild(routes), FormsModule, SharedModule],
    exports : [RouterModule]

})

export class AuthModule {}