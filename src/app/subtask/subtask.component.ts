import { SubTask } from './../list/list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {

  subTask!: any;
  dataSource!: any;
  userId: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private route1: Router, private authService: AuthService, private httpclient: HttpClient) {
    this.route.params.subscribe((res) => {
      this.userId = res['id'];
    })
  }

  ngOnInit(): void {
    this.createsubTaskForm();
    this.getTask();
  }

  getTask() {
    this.httpclient.get<any>(`http://localhost:3000/task/${this.userId}`).subscribe({
      next: response => {
        console.log(response);
        this.dataSource = response;
      }
    });
  }

  createsubTaskForm() {
    this.subTask = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]]

    });
  }

  onSubmit(): void {
    let formValue = { ...this.dataSource };
    let data = { ...this.subTask.value };
    data.id = new Date().getTime().toString();
    console.log(data);
    
    if (formValue.subtask) {
      formValue.subtask.push(data);
      console.log(formValue);
    } else {
      formValue.subtask = [data];
      console.log(formValue);
    }
    console.log(formValue);

    this.httpclient.put(`http://localhost:3000/task/${this.userId}`, formValue).subscribe(
      res => {
        this.route1.navigate(['/']);
      }
    )
  }
}