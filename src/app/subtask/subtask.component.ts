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

  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute, private route1: Router, private authService: AuthService, private httpclient: HttpClient) {
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

  onSubmit() : void {
    if ( this.dataSource.subtask ) {
      const formValue = this.dataSource.subtask.push[this.subTask.value];
      console.log(formValue);
    } else {
      const formValue = this.subTask.value;
      console.log(formValue);
    }

    this.httpclient.put(`http://localhost:3000/task/${this.userId}`, formValue).subscribe(
      res => {
        this.route1.navigate(['/']);
      }
    )
    // this.getTask();
    // const formValue = {...this.subTask.value};
    // console.log(formValue);
    // this.authService.Subtask(formValue.title, formValue.description, formValue.date).subscribe({
        // this.route1.navigate(['/']);
      // }
    // });
  }

}
function formValue(arg0: string, formValue: any) {
  throw new Error('Function not implemented.');
}

