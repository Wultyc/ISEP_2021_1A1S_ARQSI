import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', 
})
export class ImportGLXService {

  url = environment.apiEndpointBackendGLX;

  constructor(private http: HttpClient) { }

  // file from event.target.files[0]
  uploadFile(file: any): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('glx', file);    
    const req = new HttpRequest('POST', this.url, formData);
    return this.http.request(req);
  }
  // postNode(node: Nodes): Observable<Nodes> {
  //   return this.httpClient.post<Nodes>(this.url, node)
  //     // .pipe(
  //     //   catchError(this.handleError(error: any))
  //     // );
  //      .pipe(
  //       catchError((err) => {
  //         // console.error('Erro')
  //         // console.error(err);
 
  //         //Handle the error here
 
  //         return throwError(err);    //Rethrow it back to component
  //       })
  //     )
  // }
}
  