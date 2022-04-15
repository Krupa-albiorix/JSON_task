import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-subtask',
  templateUrl: './subtask.component.html',
  styleUrls: ['./subtask.component.scss']
})
export class SubtaskComponent implements OnInit {

  subTask!: any;
  dataSource!: any;

  constructor(private formBuilder:FormBuilder, private httpclient: HttpClient) { }

  ngOnInit(): void {
    this.createsubTaskForm();
  }

  getTask() {
    this.httpclient.get<any>('http://localhost:3000/task').subscribe({
      next : response => {
        console.log(response);
        this.dataSource = response;
        console.log(this.dataSource);
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

  onSubmit() {

  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

}
