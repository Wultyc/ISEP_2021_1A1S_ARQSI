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

}
