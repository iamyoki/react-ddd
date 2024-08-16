import { nanoid } from "nanoid";

class Group {
  id = nanoid();
  groupTitle = `TodoListGroup - ${new Date().toLocaleString()}`;
  todoListId = "";

  constructor(todoListId) {
    this.todoListId = todoListId;
  }
}

export class TodoListGroupsAggregate {
  id = nanoid();
  groups = [];
  removedGroups = [];

  addGroup(todoListId) {
    const group = new Group(todoListId);
    this.groups = this.groups.concat(group);
  }

  removeGroup(groupId) {
    const target = this.groups.find((g) => g.id === groupId);
    this.groups = this.groups.filter((g) => g !== target);
    this.removedGroups = this.removedGroups.concat(target);
  }

  removeAllGroups() {
    this.removedGroups = [...this.groups];
    this.groups = [];
  }

  restoreLastRemovedGroup() {
    const target = this.removedGroups.pop();
    this.groups = this.groups.concat(target);
  }

  restoreAllRemovedGroups() {
    this.groups = this.groups.concat(this.removedGroups);
    this.removedGroups = [];
  }
}
