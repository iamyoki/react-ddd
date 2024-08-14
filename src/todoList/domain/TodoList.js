function uuid() {
  return Math.floor(Math.random() * 100).toString() + Date.now();
}

export class TodoItem {
  id = uuid();
  title = "";
  completed = false;

  updateTitle(newTitle) {
    this.title = newTitle;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

export class TodoListAggregate {
  id = uuid();
  todoItems = [];

  addItem(title) {
    const newTodoItem = new TodoItem();
    newTodoItem.updateTitle(title);
    this.todoItems = this.todoItems.concat(newTodoItem);
  }

  removeItem(itemId) {
    this.todoItems = this.todoItems.filter((item) => item.id !== itemId);
  }

  updateItemTitle(itemId, title) {
    this.todoItems = this.todoItems.map((item) =>
      item.id === itemId ? { ...item, title } : item
    );
  }

  toggleItemCompletion(itemId) {
    this.todoItems = this.todoItems.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
  }

  reset() {
    this.todoItems = [];
  }
}

export class TodoListApplicationAggregate {
  id = uuid();

  /**@type {TodoListAggregate[]} */
  todoLists = [];

  /**@type {TodoListAggregate[]} */
  removedLists = [];

  addList(todoList) {
    this.todoLists = this.todoLists.concat(todoList);
  }

  removeList(id) {
    const found = this.todoLists.find((list) => list.id === id);
    
    this.removedLists = this.removedLists.concat(found);
    this.todoLists = this.todoLists.filter((list) => list !== found);
  }

  restoreLast() {
    const last = this.removedLists.at(-1);
    
    if (last) {
      this.removedLists = this.removedLists.slice(0, -1);
      this.todoLists = this.todoLists.concat(last);
    }
  }
}
