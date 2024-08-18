import { TodoListRepository } from "../domain/repositories/TodoListRepository";
import { Todo, TodoListAggregate } from "../domain/TodoListAggregate";

/**@implements {TodoListRepository} */
export class TodoListIndexedDBRepository {
  /**@type {import("idb").IDBPDatabase} */
  db;

  constructor(db) {
    this.db = db;
  }

  async save(todoList) {
    await this.db.put("todoList", todoList);
    return todoList;
  }

  async findAll() {
    const dataList = await this.db.getAll("todoList");
    return dataList?.map(this.toDomain);
  }

  async findById(todoListId) {
    const data = await this.db.get("todoList", todoListId);
    return data && this.toDomain(data);
  }

  async removeById(todoListId) {
    await this.db.delete("todoList", todoListId);
  }

  toDomain(dataEntity) {
    const todoList = new TodoListAggregate();
    todoList.id = dataEntity.id;
    todoList.todos = dataEntity.todos?.map((entity) => {
      const todo = new Todo(entity.title.title);
      todo.id = entity.id;
      todo.completed = entity.completed;
      return todo;
    });
    return todoList;
  }
}
