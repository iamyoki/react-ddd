import { useRef, useState } from "react";
import { TodoListAggregate } from "../domain/TodoList";

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

export function TodoList() {
  const todoListRef = useRef(new TodoListAggregate());
  const [todoList, setTodoList] = useState([]);

  function addTodo() {
    todoListRef.current.addItem();
    setTodoList([...todoListRef.current.todoItems]);
  }

  function updateTitle(id, title) {
    todoListRef.current.updateItemTitle(id, title);
    setTodoList([...todoListRef.current.todoItems]);
  }

  function toggleCompletion(id) {
    todoListRef.current.toggleItemCompletion(id);
    setTodoList([...todoListRef.current.todoItems]);
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
    </div>
  );
}
