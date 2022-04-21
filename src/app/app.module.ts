import { PracticeComponent } from './practice/practice.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatComponentsModule } from './mat-components.module';
import { ListComponent } from './list/list.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { HttpClientModule } from '@angular/common/http';
import { SubtaskComponent } from './subtask/subtask.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddtaskComponent,
    SubtaskComponent,
    PracticeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
