import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{

    constructor(private dataStorageService : DataStorageService, private authService : AuthService) {}

    isAuthenticated = false

    private headerSubscription : Subscription

    @Output() featureSelected = new EventEmitter<string>();

    ngOnInit(): void {
        this.headerSubscription = this.authService.user.subscribe( user => {
            this.isAuthenticated = !user ? false : true 
            console.log(!user)
            console.log(!!user)
        })       
    }

    ngOnDestroy(): void {
        this.headerSubscription.unsubscribe()
    }

    onSelect(feature: string){
        this.featureSelected.emit(feature);
    }


    saveData() {
        this.dataStorageService.storeRecipe()
    }

    getData(){
        this.dataStorageService.fetchRecipe().subscribe(response => {
            console.log(response)
        });
    }

    logout(){
        this.authService.logOut()
    }
}