import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  addTask!: any;
  userId!: any;
  data!: any;
  dataSource = [];

  constructor(private formBuilder: FormBuilder, private httpclient: HttpClient, private route1: Router, private route: ActivatedRoute, private authService: AuthService,
  ) {
    this.createaddTaskForm();
    this.route.params.subscribe((res) => {
      this.userId = res['id'];
      if (this.userId) {
        this.patchFormValue()
      }
    })
  }

  ngOnInit(): void {

  }

  patchFormValue() {
    this.httpclient.get<any>(`http://localhost:3000/task/${this.userId}`).subscribe(
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

  isSuccessful = false;

  onSubmit(): void {
    const formValue = this.addTask.value
    this.authService.task(formValue.title, formValue.description, formValue.date, 'panding').subscribe({
      next: (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.route1.navigate(['/']);
      }
    });
  }

  onUpdate() {
    
    const formValue = {...this.addTask.value}
    formValue.status = this.data.status
    console.log('formValue: ', formValue);
    console.log('this.userId: ', this.userId);

    this.httpclient.put(`http://localhost:3000/task/${this.userId}`, formValue).subscribe(
      res => {
        this.data = res;
        console.log(this.data);
        this.route1.navigate(['/']);
      
      }
    )
  }
  
}