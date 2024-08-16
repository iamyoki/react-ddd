import { TodoListRepository } from "../domain/repositories/TodoListRepository";
import { TodoListAggregate } from "../domain/TodoListAggregate";

/**@implements {TodoListRepository} */
export class TodoListInMemoryRepository {
  store = new Map();

  add(todoList) {
    this.store.set(todoList.id, todoList);
    return todoList;
  }

  update(todoList) {
    if (this.store.has(todoList.id)) {
      this.store.set(todoList.id, todoList);
      return todoList;
    }
  }

  findAll() {
    return Array.from(this.store.values());
  }

  findById(todoListId) {
    return this.store.get(todoListId)
  }

  removeById(todoListId) {
    this.store.delete(todoListId);
  }
}
