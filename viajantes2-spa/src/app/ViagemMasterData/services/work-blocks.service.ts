import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WorkBlock, WorkBlockPost } from '../models/workBlock';

@Injectable({
  providedIn: 'root'
})
export class WorkBlocksService {

  constructor(private httpClient: HttpClient) { }
  url = environment.apiEndpointBackendVDM + 'workBlock';  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  getWorkBlocks(): Observable<WorkBlock[]> {
    return this.httpClient.get<WorkBlock[]>(this.url);
  }
  postWorkBlock(workBlock: WorkBlockPost): Observable<WorkBlockPost[]> {
    return this.httpClient.post<WorkBlockPost[]>(this.url, workBlock).pipe(
          catchError((err) => {
            console.error(err);
            return throwError(err);
          })
        )
  }
}
