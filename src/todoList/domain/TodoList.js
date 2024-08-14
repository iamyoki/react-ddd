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
    this.todoItems.push(newTodoItem);
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
}
