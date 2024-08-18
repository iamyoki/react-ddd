import { TodoListGroupsRepository } from "../domain/repositories/TodoListGroupsRepository";
import { TodoListGroupsAggregate } from "../domain/TodoListGroupsAggregate";

/*** @implements {TodoListGroupsRepository} */
export class TodoListGroupsIndexedDBRepository {
  /**@type {import("idb").IDBPDatabase} */
  db;

  constructor(db) {
    this.db = db;
  }

  async save(todoListGroups) {
    await this.db.put("todoListGroups", todoListGroups);
    return todoListGroups;
  }

  async findAll() {
    const dataList = await this.db.getAll("todoListGroups");
    return dataList?.map(this.toDomain);
  }

  async findById(todoListGroupsId) {
    const data = await this.db.get("todoListGroups", todoListGroupsId);
    if (!data) return;

    return this.toDomain(data);
  }

  async removeById(todoListGroupsId) {
    await this.db.delete("todoListGroups", todoListGroupsId);
  }

  toDomain(dataEntity) {
    const todoListGroups = new TodoListGroupsAggregate();
    todoListGroups.id = dataEntity.id;
    todoListGroups.groups = dataEntity.groups;
    todoListGroups.removedGroups = dataEntity.removedGroups;
    return todoListGroups;
  }
}
