import "./App.css";
import { TodoListInMemoryRepository } from "./todoList/infrastructure/TodoListInMemoryRepository";
import { TodoListService } from "./todoList/services/TodoListService";
import { TodoListGroups } from "./todoListGroups/components/TodoListGroups";
import { TodoListGroupsInMemoryRepository } from "./todoListGroups/infrastructure/TodoListGroupsInMemoryRepository";
import { TodoListGroupsService } from "./todoListGroups/services/TodoListGroupsService";

// repositories
const todoListRepository = new TodoListInMemoryRepository();
const todoListGroupsRepository = new TodoListGroupsInMemoryRepository();

// services
const todoListService = new TodoListService(todoListRepository);
const todoListGroupsService = new TodoListGroupsService(
  todoListGroupsRepository,
  todoListService
);

const todoListGroups = todoListGroupsService.create();

function App() {
  return (
    <div className="App">
      <TodoListGroups
        id={todoListGroups.id}
        todoListService={todoListService}
        todoListGroupsService={todoListGroupsService}
      />
    </div>
  );
}

export default App;
