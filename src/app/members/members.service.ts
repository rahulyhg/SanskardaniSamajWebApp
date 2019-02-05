import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IMember } from './member';

@Injectable({
  providedIn: 'root'
})

export class MembersService {
  private membersUrl = 'https://ssmnodejsservice.herokuapp.com/api/members';

  constructor(private http: HttpClient) { }

  getMembers(): Observable<IMember[]> {
    return this.http.get<IMember[]>(this.membersUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getMember(id: number): Observable<IMember | undefined> {
    return this.getMembers().pipe(
      map((products: IMember[]) => products.find(p => p.MembershipNumber === id))
    );
  }

  postMember(member:IMember){
      const httpOptions ={
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
      } 
      this.http.post(this.membersUrl, member, httpOptions).pipe( tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError));
    
  }

  saveMember(member:IMember):boolean{
      return true;
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
