import { TodoListRepository } from "../domain/repositories/TodoListRepository";

/**@implements {TodoListRepository} */
export class TodoListInMemoryRepository {
  store = new Map();

  save(todoList) {
    this.store.set(todoList.id, todoList);
    return todoList;
  }

  findAll() {
    return Array.from(this.store.values());
  }

  findById(todoListId) {
    return this.store.get(todoListId);
  }

  removeById(todoListId) {
    this.store.delete(todoListId);
  }
}
