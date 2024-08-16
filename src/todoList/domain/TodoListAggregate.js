import { nanoid } from "nanoid";

class Title {
  title = "";

  constructor(title = "") {
    Title.validation(title);
    this.title = title;
  }

  static validation(title) {
    if (typeof title !== "string") {
      throw new Error("title should be string");
    }
    if (title.length > 20) {
      throw new Error("title should be at most 20 charactors");
    }
  }
}

export class Todo {
  id = nanoid();
  title = new Title();
  completed = false;

  constructor(title) {
    this.title = new Title(title);
  }

  updateTitle(newTitle) {
    this.title = new Title(newTitle);
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}

export class TodoListAggregate {
  id = nanoid();
  todos = [];

  addTodo() {
    const newTodo = new Todo("");
    this.todos = this.todos.concat(newTodo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  updateTodoTitle(todoId, title) {
    const newTitle = new Title(title);
    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, title: newTitle } : todo
    );
  }

  toggleTodoCompletion(todoId) {
    this.todos = this.todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
  }
}
