import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Nodes} from '../models/nodes';
import {Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(private httpClient: HttpClient) { }
  url = environment.apiEndpointBackendRDM + 'nodes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getNodes(): Observable<Nodes[]> {
    return this.httpClient.get<Nodes[]>(this.url);    
  }

  postNode(node: Nodes): Observable<Nodes> {
    return this.httpClient.post<Nodes>(this.url, node).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    )
  }

}
