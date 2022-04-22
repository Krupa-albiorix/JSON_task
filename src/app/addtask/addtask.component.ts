import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  addTask!: any;
  taskId!: any;
  data!: any;

  constructor(private formBuilder: FormBuilder, private httpclient: HttpClient, private route1: Router, 
    private route: ActivatedRoute, private authService: AuthService,
  ) {
    this.createaddTaskForm();
    this.route.params.subscribe((res) => {
      this.taskId = res['id'];
      if (this.taskId) {
        this.patchFormValue()
      }
    })
  }

  ngOnInit(): void {

  }

  patchFormValue() {
    this.authService.patchFormValue(this.taskId).subscribe(
      res => {
        this.data = res;
        this.addTask.patchValue(this.data);
      }
    )
  }

  createaddTaskForm() {
    this.addTask = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.addTask.valid) {
      const formValue = this.addTask.value
      this.authService.task(formValue.title, formValue.description, formValue.date, 'panding').subscribe({
        next: () => {
          this.route1.navigate(['/']);
        }
      });
    }
  }

  onUpdate() {
    if (this.addTask.valid) {
      const formValue = {...this.addTask.value}
      formValue.status = this.data.status
      this.authService.updateAddTask(this.taskId, formValue).subscribe(
        _res => {
          this.route1.navigate(['/']);
        }
      )
    }
  }

}