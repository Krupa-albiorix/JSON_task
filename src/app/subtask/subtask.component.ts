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
  taskId: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private route1: Router, private authService: AuthService, private httpclient: HttpClient) {
    this.route.params.subscribe((res) => {
      this.taskId = res['id'];
    })
  }

  ngOnInit(): void {
    this.createsubTaskForm();
    this.getTask();
  }

  getTask() {
    this.authService.patchFormValue(this.taskId).subscribe(response => {
      this.dataSource = response;
    }
    );
  }

  createsubTaskForm() {
    this.subTask = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]]

    });
  }

  onSubmit(): void {
    if (this.subTask.valid) {
      let formValue = { ...this.dataSource };
      let data = { ...this.subTask.value };
      data.id = new Date().getTime().toString();
      if (formValue.subtask) {
        formValue.subtask.push(data);
      } else {
        formValue.subtask = [data];
      }

      this.authService.updateAddTask(this.taskId, formValue).subscribe(

        _res => {
          this.route1.navigate(['/']);
        }
      )
    }
  }
}