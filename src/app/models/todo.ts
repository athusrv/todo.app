export class Todo {
  id!: number
  title!: string
  description?: string
  status!: string

  static build(payload: any) {
    const todo = new Todo()
    Object.assign(todo, payload)

    return todo
  }
}
