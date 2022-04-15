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

  constructor(private formBuilder: FormBuilder, private httpclient: HttpClient, private route1: Router, private route: ActivatedRoute, private authService: AuthService,
    ) { 
    this.createaddTaskForm();
    this.route.params.subscribe((res) => {
      this.userId = res['id'];
      if(this.userId){
        this.patchFormValue() 
      }
    })
  }

  ngOnInit(): void {
   
  }

  patchFormValue() {
    this.httpclient.get<any>('http://localhost:3000/task').subscribe(
      res=>{
        this.data = res;
        console.log(this.data);
        const currentUser = this.data.find((m: any) => m.id == this.userId);
        console.log(currentUser);
        this.addTask.patchValue(currentUser); 
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
    this.httpclient.get<any>('http://localhost:3000/task').subscribe(
      res=>{
        this.data = res;
        console.log(this.data);
        const currentUserindex = this.data.findIndex((a: any) => a.id == this.userId);
        this.data[currentUserindex] = {...this.addTask.value, id: this.userId};
        return this.httpclient.post('http://localhost:3000/task' , this.data);
      }
      // this.route1.navigate(['/']);
    )
  }

}