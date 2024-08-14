import { memo, useState } from "react";

const Todo = memo(function Todo({ title='', completed = false, onUpdateTitle, onToggleCompletion }) {
  console.log('re-render: ', title);
  
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
})

export function TodoList() {
  const [todoList, setTodoList] = useState([]);

  function addTodo() {
    setTodoList(todoList.concat({}));
  }

  function updateTitle(id, title) {
    setTodoList(
      todoList.map((item, i) => (i === id ? { ...item, title } : item))
    );
  }

  function toggleCompletion(id) {
    setTodoList(
      todoList.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  return (
    <div>
      <ul>
        {todoList.map((todo, index) => (
          <Todo
            key={index}
            title={todo.title}
            completed={todo.completed}
            onUpdateTitle={(title) => {
              updateTitle(index, title);
            }}
            onToggleCompletion={() => {
              toggleCompletion(index);
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
