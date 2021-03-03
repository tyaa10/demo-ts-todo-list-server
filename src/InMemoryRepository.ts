import TodoItemModel from './TodoItemModel'

export default class InMemoryRepository {
  public static todoList: TodoItemModel[] = [
    new TodoItemModel('t1', 'd1', new Date()),
    new TodoItemModel('t2', 'd2', new Date()),
    new TodoItemModel('t3', 'd3', new Date())
  ]
}