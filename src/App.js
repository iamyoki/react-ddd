import "./App.css";
import { TodoListInMemoryRepository } from "./todoList/infrastructure/TodoListInMemoryRepository";
import { TodoListGroups } from "./todoListGroups/components/TodoListGroups";
import { TodoListGroupsAggregate } from "./todoListGroups/domain/TodoListGroupsAggregate";
import { TodoListGroupsInMemoryRepository } from "./todoListGroups/infrastructure/TodoListGroupsInMemoryRepository";

const todoListRepository = new TodoListInMemoryRepository();

const todoListGroupsRepository = new TodoListGroupsInMemoryRepository();
const todoListGroups = new TodoListGroupsAggregate();
todoListGroupsRepository.save(todoListGroups);

window.todoListRepository = todoListRepository;
window.todoListGroupsRepository = todoListGroupsRepository;

function App() {
  return (
    <div className="App">
      <TodoListGroups
        id={todoListGroups.id}
        todoListRepository={todoListRepository}
        todoListGroupsRepository={todoListGroupsRepository}
      />
    </div>
  );
}

export default App;
