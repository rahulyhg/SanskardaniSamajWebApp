import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { IResponse } from '../models/response';



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    username: string = "Admin";
    password: string = "12345";
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private baseUrl = 'https://ssmnodejsservice.herokuapp.com/'

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        console.log(username, password);
        return this.http.post<IResponse>(this.baseUrl + 'api/authenticate', { username, password })
            .pipe(map(result => {
                console.log(result);
                var resp = <IResponse>result;
                if (resp.IsSuccess) {
                    var user = <User>(resp.Data);

                    // login successful if there's a jwt token in the response
                    if (user != null && user != undefined) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        sessionStorage.setItem('currentUser', JSON.stringify(user));
                        this.currentUserSubject.next(user);
                        return user;
                    }
                }
                else {
                    if (resp.StatusCode == 420) {
                       throw resp.Message; 
                    }
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}