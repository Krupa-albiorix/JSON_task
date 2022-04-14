import { AddtaskComponent } from './addtask/addtask.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AddtaskComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
// {
//     path: 'home',
//     component: HomeComponent
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
