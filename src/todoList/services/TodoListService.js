import { TodoListRepository } from "../domain/repositories/TodoListRepository";
import { TodoListAggregate } from "../domain/TodoListAggregate";

export class TodoListService {
  /**@type {TodoListRepository} */
  todoListRepository;

  constructor(todoListRepository) {
    this.todoListRepository = todoListRepository;
  }

  async create() {
    const todoList = new TodoListAggregate();
    await this.todoListRepository.save(todoList);
    return todoList;
  }

  async findById(todoListId) {
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    return todoList;
  }

  async addTodo(todoListId, title) {
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    todoList.addTodo(title);
    await this.todoListRepository.save(todoList);
    return todoList;
  }

  async updateTodoTitle(todoListId, todoId, newTitle) {
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    todoList.updateTodoTitle(todoId, newTitle);
    await this.todoListRepository.save(todoList);
    return todoList;
  }

  async toggleTodoCompletion(todoListId, todoId) {
    const todoList = await this.todoListRepository.findById(todoListId);
    if (!todoList) throw new Error("TodoList not found");
    todoList.toggleTodoCompletion(todoId);
    await this.todoListRepository.save(todoList);
    return todoList;
  }
}
