import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IMember } from './member';
import { IResponse } from './response';

@Injectable({
  providedIn: 'root'
})

export class MembersService {
  private membersUrl = 'https://ssmnodejsservice.herokuapp.com/api/members';

  constructor(private http: HttpClient) { }

  getMembers(): Observable<IResponse> {
    return this.http.get<IResponse>(this.membersUrl).pipe(
      tap(data => { }
        //console.log('All: ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  getMember(id: string): Observable<IResponse | undefined> {
    return this.http.get<IResponse>(this.membersUrl + '/' + id).pipe(
      tap(data => { }
        //console.log('All: ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  postMember(member: IMember): boolean {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log(member);
    this.http.post(this.membersUrl, member, httpOptions)
      .subscribe(r => {
        // console.log('All: ' + JSON.stringify(data));
        var resp = <IResponse>r;
        if (resp.StatusCode == 100) {
          alert("date saved successfully.");
        }
        else{
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
    return false;
  }

  putMember(member: IMember): boolean {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(member);
    this.http.put(this.membersUrl + "/" + member._id, member, httpOptions)
      .subscribe(data => {
        // console.log('All: ' + JSON.stringify(data));
        var resp = <IResponse>data;
        if (resp.StatusCode == 100) {
          alert("date saved successfully.");
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
    return false;
  }

  deleteMember(id: string): boolean {
    this.http.delete(this.membersUrl + '/' + id)
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
    return false;
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
