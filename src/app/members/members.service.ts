import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IMember } from '../models/member';
import { IResponse } from '../models/response';
import { SearchCriteria } from '../models/SearchCriteria';

@Injectable({
  providedIn: 'root'
})

export class MembersService {
  private membersUrl = 'https://ssmnodejsservice.herokuapp.com/api/members';
  private advancedSearchUrl = 'https://ssmnodejsservice.herokuapp.com/api/advancesearch';

  constructor(private http: HttpClient) { }

  getMembers(): Observable<IResponse> {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        })
      };
      return this.http.get<IResponse>(this.membersUrl, httpOptions).pipe(
        tap(data => { }
          //console.log('All: ' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
    }
  }

  getMember(id: string): Observable<IResponse | undefined> {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        })
      };
      return this.http.get<IResponse>(this.membersUrl + '/' + id, httpOptions).pipe(
        tap(data => { }
          //console.log('All: ' + JSON.stringify(data))
        ),
        catchError(this.handleError)
      );
    }
  }

  postMember(member: IMember): Observable<IResponse> {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        })
      };

      // console.log(member);
    return this.http.post(this.membersUrl, member, httpOptions)
           .pipe(map((data: IResponse) => {            
            return data;
          }), catchError(this.handleError));        
    }
  }

  putMember(member: IMember): Observable<IResponse> {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        })
      };
      console.log(member);
      return this.http.put(this.membersUrl + "/" + member._id, member, httpOptions).
      pipe(map((data: IResponse) => {            
        return data;
      }), catchError(this.handleError));       
    }
  }

  deleteMember(id: string): boolean {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        })
      };
      this.http.delete(this.membersUrl + '/' + id, httpOptions)
        .subscribe(data => {
          var resp = <IResponse>data;
          if (resp.StatusCode == 100) {
            alert("Member deleted successfully.");
          }
          else {
            alert(JSON.stringify(resp));
            console.log(resp);
          }
        },
          err2 => {
            if (err2.error) {
              alert(JSON.stringify(err2.error));
            }
            else {
              alert(JSON.stringify(err2));
            }
            console.log(err2);
            return false;
          });
    }
    return false;
  }

  advancedSearch(searchCriteria: SearchCriteria):Observable<IResponse>
  {
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
        })
      };

     return this.http.post(this.advancedSearchUrl, searchCriteria, httpOptions)
      .pipe(map((data: IResponse) => {            
        return data;
      }), catchError(this.handleError));   
    }
  }

  private handleError(err: HttpErrorResponse) {
    //alert("Error");
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
    console.log(errorMessage); 
    return throwError(errorMessage);
  }
}
