import { useRef, useState } from "react";
import { TodoList } from "../../todoList/components/TodoList";
import { TodoListGroupsAggregate } from "../domain/TodoListGroupsAggregate";
import { TodoListInMemoryRepository } from "../../todoList/infrastructure/TodoListInMemoryRepository";
import { TodoListAggregate } from "../../todoList/domain/TodoListAggregate";

export function TodoListGroups() {
  const todoListGroupsRef = useRef(new TodoListGroupsAggregate());
  const todoListInMemoryRepository = useRef(new TodoListInMemoryRepository());
  const [groups, setGroups] = useState(todoListGroupsRef.current.groups);

  function handleClickAdd() {
    const newTodoList = new TodoListAggregate();
    todoListInMemoryRepository.current.add(newTodoList);
    todoListGroupsRef.current.addGroup(newTodoList.id);
    setGroups(todoListGroupsRef.current.groups);
  }

  function handleClickRemoveAllTodoList() {
    todoListGroupsRef.current.removeAllGroups();
    setGroups(todoListGroupsRef.current.groups);
  }

  function handleClickRestoreAllRemoved() {
    todoListGroupsRef.current.restoreAllRemovedGroups();
    setGroups(todoListGroupsRef.current.groups);
  }

  return (
    <div>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        }}
      >
        {groups.map((group) => (
          <div key={group.id}>
            <h2>{group.groupTitle}</h2>
            <TodoList
              todoListAggregate={todoListInMemoryRepository.current.findById(
                group.todoListId
              )}
            />
          </div>
        ))}
      </div>
      <div
        className="actions"
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <p>Actions:</p>
        <button onClick={handleClickAdd}>Add TodoList</button>
        <button onClick={handleClickRemoveAllTodoList}>
          Remove All TodoList
        </button>
        <button onClick={handleClickRestoreAllRemoved}>
          Restore All Removed
        </button>
      </div>
    </div>
  );
}
