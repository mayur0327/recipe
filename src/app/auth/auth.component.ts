import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
    selector : 'app-authcomponent',
    templateUrl : './auth.component.html',
    styleUrls : ['./auth.component.css']
})

export class AuthComponent implements OnDestroy{

    loginMode = true
    isLoading = false
    error : string = null

    private closeSub : Subscription;

    @ViewChild(PlaceHolderDirective, {static: false}) alertHost : PlaceHolderDirective;

    constructor(private authService : AuthService, private route : Router, private componentFactoryResolver : ComponentFactoryResolver){}

    switchMode(){
        this.loginMode = !this.loginMode
    }


    onSubmit(authForm : NgForm){

        const email = authForm.value.email
        const password = authForm.value.password

        let authObs : Observable<AuthResponseData>;

        if(!authForm.valid){
            return
        }

        this.isLoading = true

        if(this.loginMode){
            authObs = this.authService.login(email, password);
            
        } else {
        authObs = this.authService.signUp(email, password)
        }

        authObs.subscribe(responseData => {
            console.log(responseData)
            this.isLoading = false
            this.route.navigate(['/recipe'])
            }, 
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage
                //this.showAlert(errorMessage);
                this.isLoading = false
            })

        authForm.reset()
    }

    onHandleError(){
        this.error = null
    }

    private showAlert(message : string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const newComponent = hostViewContainerRef.createComponent(alertComponentFactory);

        newComponent.instance.message = message;
        this.closeSub = newComponent.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear()
        });
    }

    ngOnDestroy(): void {

        if(this.closeSub){
        this.closeSub.unsubscribe()
        }
    }

}