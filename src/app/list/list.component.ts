import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';

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
  data!: any;

  dataSource!: MatTableDataSource<AddTask>;
  taskList: AddTask[] = [];
  innerDisplayedColumns = ['id', 'title', 'description', 'date', 'updatedata'];
  columnsToDisplay = ['id', 'title', 'description', 'date', 'status', 'updatedata'];
  expandedElement!: AddTask | null;

  constructor(private httpclient: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.authService.getlist().subscribe({
      next: response => {
        response.forEach((user: AddTask) => {
          if (
            user.subtask &&
            Array.isArray(user.subtask) &&
            user.subtask.length
          ) {
            this.taskList = [
              ...this.taskList,
              { ...user, subtask: new MatTableDataSource(user.subtask) },
            ];
          } else {
            this.taskList = [
              ...this.taskList,
              { ...user, subtask: new MatTableDataSource() },
            ];
          }
        });
        this.dataSource = new MatTableDataSource(this.taskList);
      }
    });
  }

  deleteData(element: any, status: string) {
    const payload = { ...element }
    payload.subtask = element.subtask.data
    payload.status = status
    this.authService.deleteAddTask(payload.id, payload).subscribe(
      _res => {
        window.location.reload();
      }
    )
  }

  deleteSubData(element: any, subelement: any) {
    const data = [...element.subtask.data]
    const index = data.findIndex(subtask => subelement.id === subtask.id)
    data.splice(index, 1);
    element.subtask = data;
    this.authService.deleteSubTask(element.id, element).subscribe(
      _res => {
        window.location.reload();
      }
    )
  }

}