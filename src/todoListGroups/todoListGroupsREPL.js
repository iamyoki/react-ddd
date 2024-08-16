// This is an off-screen console REPL tool

import { TodoListService } from "../todoList/services/TodoListService";
import { TodoListGroupsAggregate } from "./domain/TodoListGroupsAggregate";
import { TodoListGroupsService } from "./services/TodoListGroupsService";

/**
 * @param {TodoListGroupsService} todoListGroupsService
 * @param {TodoListService} todoListService
 *   */
export function todoListGroupsREPL(todoListGroupsService, todoListService) {
  /**@type {TodoListGroupsAggregate[]} */
  const apps = [];

  /**@type {TodoListGroupsAggregate} */
  let currentApp;

  let currentGroup;

  const repl = {
    createApp() {
      const app = todoListGroupsService.create();
      apps.push(app);
      currentApp = app;
    },
    pickApp(id) {
      const found = apps.find((app) => app.id.startsWith(id));
      if (found) {
        currentApp = found;
      } else {
        console.log("App not found");
      }
    },
    showApps() {
      console.table(apps);
    },
    addGroup() {
      const group = todoListGroupsService.addGroup(currentApp.id);
      console.log(group);
      currentGroup = group;
    },
    pickGroup(groupId) {
      const group = currentApp.groups.find((group) =>
        group.id.startsWith(groupId)
      );
      if (group) {
        currentGroup = group;
      } else {
        console.log("Group not found");
      }
    },
    showGroups() {
      if (currentApp) console.table(currentApp.groups);
    },
    addTodo(title) {
      todoListService.addTodo(currentGroup.todoListId, title);
    },
    showTodos() {
      const todoList = todoListService.findById(currentGroup.todoListId);
      if (todoList)
        console.table(
          todoList.todos.map((todo) => ({
            ...todo,
            title: todo.title.title,
          }))
        );
    },
  };

  return repl;
}
