import { useEffect, useRef, useState } from "react";
import { TodoListAggregate } from "../domain/TodoListAggregate";

function Todo({
  title = "",
  completed = false,
  onUpdateTitle,
  onToggleCompletion,
}) {
  return (
    <li>
      <input
        type="text"
        value={title}
        onChange={(ev) => {
          onUpdateTitle(ev.target.value);
        }}
      />
      <input
        type="checkbox"
        value={completed}
        onChange={(ev) => {
          onToggleCompletion();
        }}
      />
    </li>
  );
}

export function TodoList({ todoListAggregate }) {
  const todoListRef = useRef(todoListAggregate ?? new TodoListAggregate());
  const [todos, setTodos] = useState(todoListRef.current.todos);

  function addTodo() {
    todoListRef.current.addTodo();
    setTodos(todoListRef.current.todos);
  }

  function updateTitle(id, title) {
    todoListRef.current.updateTodoTitle(id, title);
    setTodos(todoListRef.current.todos);
  }

  function toggleCompletion(id) {
    todoListRef.current.toggleTodoCompletion(id);
    setTodos(todoListRef.current.todos);
  }

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title.title}
            completed={todo.completed}
            onUpdateTitle={(title) => {
              updateTitle(todo.id, title);
            }}
            onToggleCompletion={() => {
              toggleCompletion(todo.id);
            }}
          />
        ))}
      </ul>

      <button
        onClick={() => {
          addTodo();
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
