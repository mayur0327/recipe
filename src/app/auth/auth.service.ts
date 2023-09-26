import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { userModel } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";


export interface AuthResponseData {
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered? : boolean
}

@Injectable()
export class AuthService {

    user = new BehaviorSubject<userModel>(null);
    token : string = null;
    private tokenExpirationTimer : any

    constructor(private http : HttpClient, private router : Router){}

    signUp(email : string, password : string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
        {
            email : email,
            password : password,
            returnSecureToken : true
        }).pipe
        (catchError(this.errorHandling), tap(resData => {
            this.handleAuthentication
            (resData.email, 
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        }))
    }

    login(email : string, password : string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
        {
            email : email,
            password : password,
            returnSecureToken : true
        } //)
          ).pipe(catchError(this.errorHandling), tap(resData => {
            this.handleAuthentication
            (resData.email, 
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        }))
    }

    autoLogin(){
        const userData : {
            email : string;
            id : string;
            _token : string;
            _tokenExpirationDate : string
        } = JSON.parse(localStorage.getItem('userData'))

        if(!userData){
            return;
        }

        const loadedUser = new userModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){

            this.user.next(loadedUser);

            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

            this.autoLogout(expirationDuration)
        }
    }


    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration : number){
        setTimeout(() => {
            this.logOut();
        }, expirationDuration)
    }

    private handleAuthentication(email : string,
                                 userId : string,
                                 token : string,
                                 expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
            const users = new userModel(email,
                                        userId,
                                        token,
                                        expirationDate);
            this.user.next(users);

            this.autoLogout(expiresIn * 1000);

            localStorage.setItem('userData', JSON.stringify(users))
    }

    private errorHandling(errorRes : HttpErrorResponse) {
        let errorMessage = 'An unknown error ocurred.!';

            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            } 

            else {

            switch(errorRes.error.error.message) {
                case 'INVALID_LOGIN_CREDENTIALS' : {
                errorMessage = 'Email ID/Password is incorrect';
                break; }

                case 'EMAIL_EXISTS' : { 
                errorMessage = 'The Email already exists';
                break;}

                case 'OPERATION_NOT_ALLOWED' : {
                errorMessage = 'Operation is not alllowed';
                break;}

                case 'TOO_MANY_ATTEMPTS_TRY_LATER' : { 
                errorMessage = 'Too many attempts for Login/Signup. Please try again later.!';
                break;}
            }
            return throwError(errorMessage);
        }           
    }

}