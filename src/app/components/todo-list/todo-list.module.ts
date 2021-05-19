import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    TodoListComponent
  ],
  exports: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ]
})
export class TodoListModule {
}
