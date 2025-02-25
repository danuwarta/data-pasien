import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostProvider {
  // Gunakan IP 127.0.0.1 sebagai alternatif localhost
  server: string = 'https://danu.rpl22.my.id/api/';

  constructor(private http: HttpClient) {}

  postData(body: any, file: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.post(this.server + file, body, { 
      headers: headers,
      withCredentials: false
    });
  }
}