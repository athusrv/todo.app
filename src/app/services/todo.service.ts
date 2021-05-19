import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Todo } from "../models/todo";
import { environment } from "../../environments/environment";
import { every, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) {
  }

  public get(): Observable<Todo[]> {
    return this.http.get<any>(environment.todoUrl).pipe(
      map((response: any) => response.map(Todo.build))
    )
  }

  public create(title: string, description?: string): Observable<Todo> {
    const body = {title: title, description: description}
    return this.http.post(environment.todoUrl, body, {
      responseType: 'json'
    }).pipe(
      map(Todo.build)
    )
  }

  public update(id: number, todo: Todo | any): Observable<Todo> {
    return this.http.patch(`${environment.todoUrl}/${id}`, {...todo}).pipe(
      map(Todo.build)
    )
  }
}
