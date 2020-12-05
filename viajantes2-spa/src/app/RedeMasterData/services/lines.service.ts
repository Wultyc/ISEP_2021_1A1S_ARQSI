import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Line } from '../models/line';
import {Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinesService {

  constructor(private httpClient: HttpClient) { }
  url = environment.apiEndpointBackendRDM + 'lines';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getLines(): Observable<Line[]> {
    return this.httpClient.get<Line[]>(this.url);    
  }
}
