import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Route, RoutePost} from '../models/route';
import {Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private httpClient: HttpClient) { }
  url = environment.apiEndpointBackendRDM + 'routes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getRoutes(): Observable<Route[]> {
    return this.httpClient.get<Route[]>(this.url);    
  }
  postRoute(route: RoutePost): Observable<RoutePost> {
    return this.httpClient.post<RoutePost>(this.url, route).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    )
  }
}
