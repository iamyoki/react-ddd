import { useRef, useState } from "react";
import { TodoList } from "./TodoList";
import { TodoListAggregate, TodoListApplicationAggregate } from "../domain/TodoList";

export function TodoListApplication() {
  const todoListApplicationRef = useRef(new TodoListApplicationAggregate());
  const [todoLists, setTodoLists] = useState([]);

  function addTodoList() {
    const newTodoList = new TodoListAggregate();
    todoListApplicationRef.current.addList(newTodoList);
    setTodoLists(todoListApplicationRef.current.todoLists);
  }

  function removeTodoList(id) {
    todoListApplicationRef.current.removeList(id);
    setTodoLists(todoListApplicationRef.current.todoLists);
  }

  function restoreLast() {
    todoListApplicationRef.current.restoreLast();
    setTodoLists(todoListApplicationRef.current.todoLists);
  }

  return (
    <main>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        }}
      >
        {todoLists.map((todoList) => (
          <TodoList
            key={todoList.id}
            todoListAggregate={todoList}
            onRemove={() => {
              removeTodoList(todoList.id);
            }}
          />
        ))}
      </div>
      <button
        style={{ marginTop: 50 }}
        onClick={() => {
          addTodoList();
        }}
      >
        + Add Todo List
      </button>
      <button
        style={{ marginTop: 50 }}
        onClick={() => {
          restoreLast();
        }}
      >
        🔁 Restore Last
      </button>
    </main>
  );
}
