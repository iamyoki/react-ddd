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

  create() {
    const todoListGroups = new TodoListGroupsAggregate();
    this.todoListGroupsRepository.save(todoListGroups);
    return todoListGroups;
  }

  findById(todoListGroupsId) {
    const todoListGroups =
      this.todoListGroupsRepository.findById(todoListGroupsId);
    if (!todoListGroups) throw new Error("todoListGroups not found");
    return todoListGroups
  }

  addGroup(todoListGroupsId) {
    const todoListGroups =
      this.todoListGroupsRepository.findById(todoListGroupsId);
    if (!todoListGroups) throw new Error("todoListGroups not found");

    const todoList = this.todoListService.create();
    todoListGroups.addGroup(todoList.id);
    this.todoListGroupsRepository.save(todoListGroups);
  }

  removeGroup(todoListGroupsId, groupId) {
    const todoListGroups =
      this.todoListGroupsRepository.findById(todoListGroupsId);
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.removeGroup(groupId);
    this.todoListGroupsRepository.save(todoListGroups);
  }

  removeAllGroups(todoListGroupsId) {
    const todoListGroups =
      this.todoListGroupsRepository.findById(todoListGroupsId);
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.removeAllGroups();
    this.todoListGroupsRepository.save(todoListGroups);
  }

  restoreAllRemovedGroups(todoListGroupsId) {
    const todoListGroups =
      this.todoListGroupsRepository.findById(todoListGroupsId);
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.restoreAllRemovedGroups();
    this.todoListGroupsRepository.save(todoListGroups);
  }

  restoreLastRemovedGroup(todoListGroupsId) {
    const todoListGroups =
      this.todoListGroupsRepository.findById(todoListGroupsId);
    if (!todoListGroups) throw new Error("todoListGroups not found");

    todoListGroups.restoreLastRemovedGroup();
    this.todoListGroupsRepository.save(todoListGroups);
  }
}
