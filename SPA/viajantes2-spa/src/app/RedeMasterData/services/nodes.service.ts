import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Nodes} from '../models/nodes';
import {Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(private httpClient: HttpClient) { }
  url = 'http://localhost:3000/api/nodes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getNodes(): Observable<Nodes[]> {
    return this.httpClient.get<Nodes[]>(this.url);    
  }

  postNode(node: Nodes): Observable<Nodes> {
    return this.httpClient.post<Nodes>(this.url, node)
      // .pipe(
      //   catchError(this.handleError(error: any))
      // );
       .pipe(
        catchError((err) => {
          // console.error('Erro')
          // console.error(err);
 
          //Handle the error here
 
          return throwError(err);    //Rethrow it back to component
        })
      )
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      // return of(result as T);
    // };
  // }
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
