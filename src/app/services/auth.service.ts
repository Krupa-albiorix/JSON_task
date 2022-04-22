import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Subtask: any;

  constructor(private http: HttpClient) { }

  task(title: string, description: string, date: string, status: string): Observable<any> {
    return this.http.post('/task', {
      title,
      description,
      date,
      status
    }, httpOptions);
  }

  patchFormValue(id: any) {
    return this.http.get<any>(`task/${id}`);
  }
  
  updateAddTask(id: any, formValue: any) {
    return this.http.put(`task/${id}`, formValue);
  }

  getlist() {
    return this.http.get<any>('task');
  }

  deleteAddTask(id: any, payload: any) {
    return this.http.put(`task/${id}`, payload);
  }

  deleteSubTask(id: any, element: any) {
    return this.http.put(`task/${id}`, element);
  }

}
