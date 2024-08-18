import { TodoListService } from "../../todoList/services/TodoListService";
import { TodoListGroupsRepository } from "../domain/repositories/TodoListGroupsRepository";
import { TodoListGroupsAggregate } from "../domain/TodoListGroupsAggregate";

export class TodoListGroupsService {
  /**@type {TodoListGroupsRepository} */
  todoListGroupsRepository;

  /**@type {TodoListService} */
  todoListService;

  constructor(todoListGroupsRepository, todoListService) {
    this.todoListGroupsRepository = todoListGroupsRepository;
    this.todoListService = todoListService;
  }

  async create() {
    const todoListGroups = new TodoListGroupsAggregate();
    await this.todoListGroupsRepository.save(todoListGroups);
    return todoListGroups;
  }

  async ensureFirstOne() {
    const all = await this.todoListGroupsRepository.findAll();
    if (all?.[0]) return all[0];

    return this.create();
  }

  async findById(todoListGroupsId) {
    const todoListGroups = await this.todoListGroupsRepository.findById(
      todoListGroupsId
    );
    if (!todoListGroups) throw new Error("todoListGroups not found");
    return todoListGroups;
  }

  async addGroup(todoListGroupsId) {
    const todoListGroups = await this.todoListGroupsRepository.findById(
      todoListGroupsId
    );
    if (!todoListGroups) throw new Error("todoListGroups not found");

    const todoList = await this.todoListService.create();
    todoListGroups.addGroup(todoList.id);
    await this.todoListGroupsRepository.save(todoListGroups);
    return todoListGroups;
  }

  async removeGroup(todoListGroupsId, groupId) {
    const todoListGroups = await this.todoListGroupsRepository.findById(
      todoListGroupsId
    );
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.removeGroup(groupId);
    await this.todoListGroupsRepository.save(todoListGroups);
    return todoListGroups;
  }

  async removeAllGroups(todoListGroupsId) {
    const todoListGroups = await this.todoListGroupsRepository.findById(
      todoListGroupsId
    );
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.removeAllGroups();
    await this.todoListGroupsRepository.save(todoListGroups);
    return todoListGroups;
  }

  async restoreAllRemovedGroups(todoListGroupsId) {
    const todoListGroups = await this.todoListGroupsRepository.findById(
      todoListGroupsId
    );
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.restoreAllRemovedGroups();
    await this.todoListGroupsRepository.save(todoListGroups);
    return todoListGroups;
  }

  async restoreLastRemovedGroup(todoListGroupsId) {
    const todoListGroups = await this.todoListGroupsRepository.findById(
      todoListGroupsId
    );
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.restoreLastRemovedGroup();
    await this.todoListGroupsRepository.save(todoListGroups);
    return todoListGroups;
  }
}
