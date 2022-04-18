import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private httpclient: HttpClient) { }

  ngOnInit(): void {
    this.getTask();
  }

  dataSource = [];

  getTask() {
    this.httpclient.get<any>('http://localhost:3000/task').subscribe({
      next: response => {
        console.log(response);
        this.dataSource = response;
        console.log(this.dataSource);
        // this.dataSource.forEach((data: any) => {
        //   data.status = ['panding'];
        // });
      }
    });
  }

  columnsToDisplay = ['id', 'title', 'description', 'date', 'status', 'updatedata'];
  expandedElement!: PeriodicElement | null;

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

export interface PeriodicElement {
  id: number;
  title: string;
  description: string;
  date: string;
}