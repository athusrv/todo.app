import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Todo } from '../../models/todo'
import { MatSelectionList, MatSelectionListChange } from "@angular/material/list";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TodoListComponent {
  @Input()
  todos!: Todo[];

  @ViewChild('todoList')
  todoList!: MatSelectionList

  @Output()
  changed: EventEmitter<{ id: number, done: boolean }> = new EventEmitter()

  onSelectedItem(event: MatSelectionListChange) {
    const todo = Todo.build(event.options[0].value)
    this.changed.emit({id: todo.id, done: event.options[0].selected})
  }

}
