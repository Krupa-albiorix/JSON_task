import { AddtaskComponent } from './addtask/addtask.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubtaskComponent } from './subtask/subtask.component';

const routes: Routes = [
  {
    path: 'addtask',
    component: AddtaskComponent
  },
  {
    path: 'addtask/:id',
    component: AddtaskComponent
  },
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'subtask',
    component: SubtaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
