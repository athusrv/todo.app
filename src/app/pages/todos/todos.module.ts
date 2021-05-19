import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TodoListModule } from "../../components/todo-list/todo-list.module";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    TodosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: '',
          component: TodosComponent
        }
      ]
    ),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TodoListModule,
    FormsModule,
    MatSnackBarModule,
  ]
})
export class TodosModule {
}
