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

export function TodoList({ id, todoListRepository }) {
  const todoListRef = useRef(new TodoListAggregate());
  const [todos, setTodos] = useState(todoListRef.current.todos);

  // initial from repository
  useEffect(() => {
    if (!todoListRepository) return;
    const todoList = todoListRepository.findById(id);
    if (todoList) {
      todoListRef.current = todoList;
      setTodos(todoList.todos);
    }
  }, [id, todoListRepository]);

  function save() {
    setTodos(todoListRef.current.todos);
    todoListRepository?.save(todoListRef.current);
  }

  function addTodo() {
    todoListRef.current.addTodo();
    save();
  }

  function updateTitle(id, title) {
    todoListRef.current.updateTodoTitle(id, title);
    save();
  }

  function toggleCompletion(id) {
    todoListRef.current.toggleTodoCompletion(id);
    save();
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
