import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {TripulantType} from '../models/tripulant-type';
import {Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TripulantTypeService {

  constructor(private httpClient: HttpClient) { }
  url = 'http://localhost:3000/api/tripulant-types';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getTripulantType(): Observable<TripulantType[]> {
    return this.httpClient.get<TripulantType[]>(this.url);    
  }
  postTripulantType(trip: TripulantType): Observable<TripulantType> {
    return this.httpClient.post<TripulantType>(this.url, trip)
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

}
