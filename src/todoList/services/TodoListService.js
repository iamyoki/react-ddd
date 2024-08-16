import { TodoListRepository } from "../domain/repositories/TodoListRepository";
import { TodoListAggregate } from "../domain/TodoListAggregate";

export class TodoListService {
  /**@type {TodoListRepository} */
  todoListRepository;

  constructor(todoListRepository) {
    this.todoListRepository = todoListRepository;
  }

  create() {
    const todoList = new TodoListAggregate();
    this.todoListRepository.save(todoList);
    return todoList;
  }

  findById(todoListId) {
    const todoList = this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    return todoList;
  }

  addTodo(todoListId, title) {
    const todoList = this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    todoList.addTodo(title);
    this.todoListRepository.save(todoList);
  }

  updateTodoTitle(todoListId, todoId, newTitle) {
    const todoList = this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    todoList.updateTodoTitle(todoId, newTitle);
    this.todoListRepository.save(todoList);
  }

  toggleTodoCompletion(todoListId, todoId) {
    const todoList = this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    todoList.toggleTodoCompletion(todoId);
    this.todoListRepository.save(todoList);
  }
}
