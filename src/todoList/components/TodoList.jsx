import { useRef, useState } from "react";

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

export function TodoList({ todoListAggregate, onRemove }) {
  const todoListRef = useRef(todoListAggregate);
  const [todoList, setTodoList] = useState(todoListRef.current.todoItems);

  function addTodo() {
    todoListRef.current.addItem();
    setTodoList(todoListRef.current.todoItems);
  }

  function updateTitle(id, title) {
    todoListRef.current.updateItemTitle(id, title);
    setTodoList(todoListRef.current.todoItems);
  }

  function toggleCompletion(id) {
    todoListRef.current.toggleItemCompletion(id);
    setTodoList(todoListRef.current.todoItems);
  }

  return (
    <div>
      <ul>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            title={todo.title}
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
        Add
      </button>

      <button
        onClick={() => {
          onRemove();
        }}
      >
        Remove And Close
      </button>
    </div>
  );
}
