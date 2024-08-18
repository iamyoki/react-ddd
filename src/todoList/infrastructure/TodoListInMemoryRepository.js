import { TodoListRepository } from "../domain/repositories/TodoListRepository";

/**@implements {TodoListRepository} */
export class TodoListInMemoryRepository {
  store = new Map();

  async save(todoList) {
    this.store.set(todoList.id, todoList);
    return todoList;
  }

  async findAll() {
    return Array.from(this.store.values());
  }

  async findById(todoListId) {
    return this.store.get(todoListId);
  }

  async removeById(todoListId) {
    this.store.delete(todoListId);
  }
}
