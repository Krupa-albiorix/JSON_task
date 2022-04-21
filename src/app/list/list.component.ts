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
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {
  task = [];
  data!: any;

  dataSource!: MatTableDataSource<AddTask>;
  usersData: AddTask[] = [];
  innerDisplayedColumns = ['id', 'title', 'description', 'date', 'updatedata'];
  columnsToDisplay = ['id', 'title', 'description', 'date', 'status', 'updatedata'];
  expandedElement!: AddTask | null;


  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.httpclient.get<any>('http://localhost:3000/task').subscribe({
      next: response => {
        response.forEach((user: AddTask) => {
          if (
            user.subtask &&
            Array.isArray(user.subtask) &&
            user.subtask.length
          ) {
            this.usersData = [
              ...this.usersData,
              { ...user, subtask: new MatTableDataSource(user.subtask) },
            ];
          } else {
            this.usersData = [
              ...this.usersData,
              { ...user, subtask: new MatTableDataSource() },
            ];
          }
        });
        this.dataSource = new MatTableDataSource(this.usersData);
        console.log(this.dataSource);
      }
    });
  }

  deleteData(element: any, status: string) {

    const payload = { ...element }
    debugger
    payload.subtask = element.subtask.data
    payload.status = status
    console.log(payload)
    if (status === "deleted"){
      console.log(status);}
    else if (status === "completed")
          status = 'green';
    this.httpclient.put(`http://localhost:3000/task/${payload.id}`, payload).subscribe(
      _res => {
        window.location.reload();
      }
    )
  }

  deleteSubData(element: any, subelement: any) {
    const data = [...element.subtask.data]
    data.splice(subelement,1);
    element.subtask = data;
    console.log(element);
    this.httpclient.put(`http://localhost:3000/task/${element.id}`, element).subscribe(
      _res => {
        window.location.reload();
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