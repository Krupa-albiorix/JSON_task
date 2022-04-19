import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {
  task = [];
  data!: any;

  dataSource!: MatTableDataSource<AddTask>;
  usersData: AddTask[] = [];
  innerDisplayedColumns = ['title', 'description', 'date'];
  columnsToDisplay = ['id', 'title', 'description', 'date', 'status', 'updatedata'];
  expandedElement!: AddTask | null;
 

  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.httpclient.get<any>('http://localhost:3000/task').subscribe({
      next: response => {
        console.log(response);
        this.dataSource = response;
        console.log(this.dataSource);
        response.forEach((user : AddTask) => {
          console.log(response);
          if (
            user.subtask &&
            Array.isArray(user.subtask) &&
            user.subtask.length
          ) {
            console.log(user.subtask.length);
            this.usersData = [
              ...this.usersData,
              { ...user, subtask: new MatTableDataSource(user.subtask) },
            ];
            console.log(this.usersData);
          } else {
            this.usersData = [...this.usersData, user];
            console.log(this.usersData);
          }
        });
        this.dataSource = new MatTableDataSource(this.usersData);
        console.log(this.dataSource);
      }
    });
  }

  deleteData(element: any, status: string) {
    console.log('element: ', element);

    const payload = { ...element }
    console.log('payload: ', payload);
    payload.status = status
    console.log('payload: ', payload);
    this.httpclient.put(`http://localhost:3000/task/${payload.id}`, payload).subscribe(
      res => {
        this.getTask();
      }
    )
  }

}

export interface AddTask {
  id: number;
  title: string;
  description: string;
  date: string;
  subtask?: SubTask[] | MatTableDataSource<SubTask>;
}

export interface SubTask {
  title: string;
  description: string;
  date: string;
}