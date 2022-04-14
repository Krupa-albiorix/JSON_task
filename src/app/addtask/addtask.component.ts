import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.scss']
})
export class AddtaskComponent implements OnInit {
  addTask!: any;

  constructor(private formBuilder: FormBuilder, private route1: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.createaddTaskForm();
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
    this.authService.task(formValue.title, formValue.description, formValue.date).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isSuccessful = true;
        this.route1.navigate(['list']);
      }
    });
  }

}
