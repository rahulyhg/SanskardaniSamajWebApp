import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { IResponse } from '../members/response';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    username: string = "Admin";
    password: string = "12345";
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private baseUrl = 'http://localhost:3000/'

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        
        return this.http.post<IResponse>(this.baseUrl + 'api/authenticate', { username, password })
            .pipe(map(result => {
                console.log(result);
                var resp = <IResponse> result;
                var user = <User>(resp.Data);
                
                console.log(user);
                
                // login successful if there's a jwt token in the response
                if (user != null && user != undefined ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
        }    

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}