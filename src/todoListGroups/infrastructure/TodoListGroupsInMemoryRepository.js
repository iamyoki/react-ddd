import { TodoListGroupsRepository } from "../domain/repositories/TodoListGroupsRepository";

/*** @implements {TodoListGroupsRepository} */
export class TodoListGroupsInMemoryRepository {
  store = new Map();

  save(todoListGroups) {
    this.store.set(todoListGroups.id, todoListGroups);
  }

  findAll() {
    return Array.from(this.store.values());
  }

  findById(todoListGroupsId) {
    return this.store.get(todoListGroupsId);
  }

  removeById(todoListGroupsId) {
    this.store.delete(todoListGroupsId);
  }
}
