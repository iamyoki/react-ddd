import { TodoListGroupsRepository } from "../domain/repositories/TodoListGroupsRepository";

/*** @implements {TodoListGroupsRepository} */
export class TodoListGroupsInMemoryRepository {
  store = new Map();

  async save(todoListGroups) {
    this.store.set(todoListGroups.id, todoListGroups);
  }

  async findAll() {
    return Array.from(this.store.values());
  }

  async findById(todoListGroupsId) {
    return this.store.get(todoListGroupsId);
  }

  async removeById(todoListGroupsId) {
    this.store.delete(todoListGroupsId);
  }
}
