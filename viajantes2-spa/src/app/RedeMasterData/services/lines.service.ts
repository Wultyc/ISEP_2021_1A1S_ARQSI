import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Line, LinePost } from '../models/line';
import {Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Route, RoutePost } from '../models/route';

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

  getLineRoutes(id: String): Observable<Line[]> {
    return this.httpClient.get<Line[]>(this.url + "/" + id + "/routes");    
  }
  postLines(line: LinePost): Observable<LinePost> {
    return this.httpClient.post<LinePost>(this.url, line).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    )
  }

  postLineRoutes(id: string, route: RoutePost, orientation: string): Observable<RoutePost>  {
    return this.httpClient.post<RoutePost>(this.url + "/" + id +"/createandaddroute/" + orientation, route).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    )
  }
}
