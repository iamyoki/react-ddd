import { useEffect, useRef, useState } from "react";
import { TodoList } from "../../todoList/components/TodoList";
import { TodoListAggregate } from "../../todoList/domain/TodoListAggregate";
import { TodoListGroupsAggregate } from "../domain/TodoListGroupsAggregate";

export function TodoListGroups({
  id,
  todoListGroupsRepository,
  todoListRepository,
}) {
  const todoListGroupsRef = useRef(new TodoListGroupsAggregate());
  const [groups, setGroups] = useState(todoListGroupsRef.current.groups);

  // initial from repository
  useEffect(() => {
    if (!todoListGroupsRepository) return;
    const todoListGroups = todoListGroupsRepository.findById(id);
    todoListGroupsRef.current = todoListGroups;
    setGroups(todoListGroups.groups);
  }, [id, todoListGroupsRepository]);

  function save() {
    setGroups(todoListGroupsRef.current.groups);
    todoListGroupsRepository?.save(todoListGroupsRef.current);
  }

  function handleClickAdd() {
    const newTodoList = new TodoListAggregate();
    todoListRepository.save(newTodoList);
    todoListGroupsRef.current.addGroup(newTodoList.id);
    save();
  }

  function handleClickRemoveGroup(groupId) {
    todoListGroupsRef.current.removeGroup(groupId);
    save();
  }

  function handleClickRemoveAllTodoList() {
    todoListGroupsRef.current.removeAllGroups();
    save();
  }

  function handleClickRestoreAllRemoved() {
    todoListGroupsRef.current.restoreAllRemovedGroups();
    save();
  }

  function handleClickRestoreLastRemoved() {
    todoListGroupsRef.current.restoreLastRemovedGroup();
    save();
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
            <TodoList
              id={group.todoListId}
              todoListRepository={todoListRepository}
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
        <button onClick={handleClickRestoreLastRemoved}>
          Restore Last Removed
        </button>
      </div>
    </div>
  );
}
