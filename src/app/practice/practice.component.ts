import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PracticeComponent implements OnInit {

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'title', 'description', 'date', 'status'];
  innerColumnsToDisplay = ['title', 'description', 'date'];
  expandedElement!: PeriodicElement | null;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  title: string;
  date: string;
  status: string;
  id: number;
  description: string;
  subTask?: SubTask[] | MatTableDataSource<SubTask>;
}

export interface SubTask {
  title: string;
  description: string;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    "title": "fvedvs",
    "description": "ioefjwo",
    "date": "2022-03-31T18:30:00.000Z",
    "status": "completed",
    "id": 1
  },
  {
    "title": "aswcdcea",
    "description": "cdwerfcdasedf",
    "date": "2022-03-31T18:30:00.000Z",
    "status": "panding",
    "id": 2,
    // "subtask": [
    //   {
    //     "title": "wecfsdwrcfs",
    //     "description": "cferfcswerfgv",
    //     "date": "2022-03-05T18:30:00.000Z"
    //   }
    // ]
  },
  {
    "title": "wioerfjcwerkmwkio1po",
    "description": "encweiofncawklc adlk",
    "date": "2022-03-31T18:30:00.000Z",
    "status": "panding",
    "id": 3,
    // "subtask": [
    //   {
    //     "title": "fihwesnfckrnk",
    //     "description": "dewpofenfoflk",
    //     "date": "2022-04-12T18:30:00.000Z"
    //   }
    // ]
  },
  {
    "title": "yttyycyiiugiph;olnmkn",
    "description": "tdtydydcycuxtgctydtrstrser",
    "date": "2022-04-12T18:30:00.000Z",
    "status": "completed",
    "id": 4
  },
  {
    "title": "yrcdyrftyctr",
    "description": "trdrtxtdydtr",
    "date": "2022-04-12T18:30:00.000Z",
    "status": "deleted",
    "id": 5
  }
]