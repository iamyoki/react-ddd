import { useEffect, useRef, useState } from "react";
import { TodoList } from "../../todoList/components/TodoList";
import { TodoListGroupsAggregate } from "../domain/TodoListGroupsAggregate";

export function TodoListGroups({ id, todoListGroupsService, todoListService }) {
  const todoListGroupsRef = useRef(new TodoListGroupsAggregate());
  const [groups, setGroups] = useState(todoListGroupsRef.current.groups);

  // initial from repository
  useEffect(() => {
    if (!todoListGroupsService) return;
    const todoListGroups = todoListGroupsService.findById(id);
    todoListGroupsRef.current = todoListGroups;
    setGroups(todoListGroups.groups);
  }, [id, todoListGroupsService]);

  function handleClickAdd() {
    todoListGroupsService.addGroup(id);
    setGroups(todoListGroupsRef.current.groups);
  }

  function handleClickRemoveGroup(groupId) {
    todoListGroupsService.removeGroup(id, groupId);
    setGroups(todoListGroupsRef.current.groups);
  }

  function handleClickRemoveAllTodoList() {
    todoListGroupsService.removeAllGroups(id);
    setGroups(todoListGroupsRef.current.groups);
  }

  function handleClickRestoreAllRemoved() {
    todoListGroupsService.restoreAllRemovedGroups(id);
    setGroups(todoListGroupsRef.current.groups);
  }

  function handleClickRestoreLastRemoved() {
    todoListGroupsService.restoreLastRemovedGroup(id);
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
            <h2>
              {group.groupTitle}{" "}
              <button onClick={() => handleClickRemoveGroup(group.id)}>
                Remove Group
              </button>
            </h2>
            <TodoList id={group.todoListId} todoListService={todoListService} />
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
        <button onClick={handleClickRestoreLastRemoved}>
          Restore Last Removed
        </button>
      </div>
    </div>
  );
}
