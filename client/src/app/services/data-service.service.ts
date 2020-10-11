import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  BASE_URL = "";


  constructor(private http: HttpClient) { 
    this.BASE_URL = "http://localhost:8080/";
  }

  getRequest(url, params): Observable<any> {
    return this.http.get(url, { params: params });
  }

  postRequest(url, body): Observable<any> {
    return this.http.post(url, body);
  }
}
