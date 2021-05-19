import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Todo } from "../../models/todo";
import { TodoService } from "../../services/todo.service";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { UntilDestroy } from "@ngneat/until-destroy";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Socket } from "ngx-socket-io";

@UntilDestroy()
@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodosComponent implements OnInit {
  todos: Todo[] = []
  todoTitle: string = '';

  constructor(private todoService: TodoService, private snackBar: MatSnackBar, private socketio: Socket) {
  }

  private _getTodos() {
    this.todoService.get().subscribe(todos => {
      this.todos = []
      todos.forEach(todo => this.todos.push(todo))
    })
  }

  ngOnInit(): void {
    this._getTodos()

    this.socketio.on('new_todo', (data: any) => {
      this._getTodos()
      this.snackBar.open(`A new todo item was added with id ${data.id}`, 'Close', {
        duration: 2000
      })
    })

    this.socketio.on('updated_todo', (data: any) => {
      this._getTodos()
      this.snackBar.open(`The todo item with id ${data.id} was updated`, 'Close', {
        duration: 2000
      })
    })

    this.socketio.on('deleted_todo', (data: any) => {
      this._getTodos()
      this.snackBar.open(`The todo item with id ${data.id} was deleted`, 'Close', {
        duration: 2000
      })
    })
  }

  onTodoItemChange($event: { id: number; done: boolean }) {
    this.todos.find(t => t.id === $event.id)!.status = $event.done ? 'DONE' : 'PENDING'
    const todo = this.todos.find(t => t.id === $event.id)
    this.todoService.update($event.id, todo).pipe(
      catchError((err: any, caught) => {
        // revert status
        this.todos.find(t => t.id === $event.id)!.status = $event.done ? 'PENDING' : 'DONE'
        return throwError(err);
      })
    ).subscribe()
  }

  createTodo() {
    this.todoService.create(this.todoTitle).pipe(
      map(todo => {
        this.todoTitle = ""
        return todo
      })
    ).subscribe(newTodo => {
      this.todos.push(newTodo)
    })
  }
}
