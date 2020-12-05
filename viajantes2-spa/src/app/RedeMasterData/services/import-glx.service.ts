import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHandler, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', 
})
export class ImportGLXService {

  url = environment.apiEndpointBackendGLX;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })}

  constructor(private http: HttpClient) { }

  // file from event.target.files[0]
  uploadFile(file: File): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    const req = new HttpRequest('POST', this.url, formData, options);
    return this.http.request(req);
  }
}
  