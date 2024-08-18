import { useEffect, useState } from "react";
import "./App.css";
import { IndexedDB } from "./core/drivers/IndexedDB";
import { TodoListIndexedDBRepository } from "./todoList/infrastructure/TodoListIndexedDBRepository";
import { TodoListService } from "./todoList/services/TodoListService";
import { TodoListGroups } from "./todoListGroups/components/TodoListGroups";
import { TodoListGroupsIndexedDBRepository } from "./todoListGroups/infrastructure/TodoListGroupsIndexedDBRepository";
import { TodoListGroupsService } from "./todoListGroups/services/TodoListGroupsService";

// repositories
// const todoListRepository = new TodoListInMemoryRepository();
// const todoListGroupsRepository = new TodoListGroupsInMemoryRepository();
const todoListRepository = new TodoListIndexedDBRepository();
const todoListGroupsRepository = new TodoListGroupsIndexedDBRepository();

// services
const todoListService = new TodoListService(todoListRepository);
const todoListGroupsService = new TodoListGroupsService(
  todoListGroupsRepository,
  todoListService
);

const openDBPromise = IndexedDB.openDB("myDatabase", 1, {
  upgrade(db) {
    console.log("upgrade");

    db.createObjectStore("todoList", {
      keyPath: "id",
      autoIncrement: true,
    });
    db.createObjectStore("todoListGroups", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
}).then((db) => {
  todoListRepository.db = db;
  todoListGroupsRepository.db = db;
});

function App() {
  const [todoListGroups, setTodoListGroups] = useState();

  async function init() {
    await openDBPromise
    todoListGroupsService.ensureFirstOne().then(setTodoListGroups);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="App">
      {todoListGroups && (
        <TodoListGroups
          id={todoListGroups.id}
          todoListService={todoListService}
          todoListGroupsService={todoListGroupsService}
        />
      )}
    </div>
  );
}

export default App;
