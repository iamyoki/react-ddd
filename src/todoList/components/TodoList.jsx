import { useContext, useEffect, useState } from "react";
import { TodoListContext } from "../contexts/TodoListContext";

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

export function TodoList({ id }) {
  const { todoListService } = useContext(TodoListContext);
  const [todos, setTodos] = useState([]);

  // init
  useEffect(() => {
    if (!todoListService) return;
    todoListService.findById(id).then((todoList) => {
      if (todoList) {
        setTodos(todoList.todos);
      }
    });
  }, [id, todoListService]);

  async function addTodo() {
    const todoList = await todoListService.addTodo(id, "");
    if (todoList) setTodos(todoList.todos);
  }

  async function updateTitle(todoId, title) {
    const todoList = await todoListService.updateTodoTitle(id, todoId, title);
    if (todoList) setTodos(todoList.todos);
  }

  async function toggleCompletion(todoId) {
    const todoList = await todoListService.toggleTodoCompletion(id, todoId);
    if (todoList) setTodos(todoList.todos);
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
