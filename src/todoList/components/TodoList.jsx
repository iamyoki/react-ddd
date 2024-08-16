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

export function TodoList({ id, todoListService }) {
  const todoListRef = useRef(new TodoListAggregate());
  const [todos, setTodos] = useState(todoListRef.current.todos);

  // init
  useEffect(() => {
    if (!todoListService) return;
    const todoList = todoListService.findById(id);
    if (todoList) {
      todoListRef.current = todoList;
      setTodos(todoList.todos);
    }
  }, [id, todoListService]);

  function addTodo() {
    todoListService.addTodo(id, "");
    setTodos(todoListRef.current.todos);
  }

  function updateTitle(todoId, title) {
    todoListService.updateTodoTitle(id, todoId, title);
    setTodos(todoListRef.current.todos);
  }

  function toggleCompletion(todoId) {
    todoListService.toggleTodoCompletion(id, todoId);
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
