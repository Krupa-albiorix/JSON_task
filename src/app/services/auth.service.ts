import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/task';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  task(title: string, description: string, date: string, status: string): Observable<any> {
    return this.http.post(AUTH_API, {
      title,
      description,
      date,
      status
    }, httpOptions);
  }
  
}
