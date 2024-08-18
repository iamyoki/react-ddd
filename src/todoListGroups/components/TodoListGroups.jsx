import { useContext, useEffect, useState } from "react";
import { TodoList } from "../../todoList/components/TodoList";
import { TodoListGroupsContext } from "../contexts/TodoListGroupsContext";

export function TodoListGroups({ id }) {
  const { todoListService, todoListGroupsService } = useContext(
    TodoListGroupsContext
  );
  const [groups, setGroups] = useState([]);

  // initial from repository
  useEffect(() => {
    if (!todoListGroupsService) return;
    todoListGroupsService.findById(id).then((todoListGroups) => {
      setGroups(todoListGroups.groups);
    });
  }, [id, todoListGroupsService]);

  async function handleClickAdd() {
    const todoListGroups = await todoListGroupsService.addGroup(id);
    if (todoListGroups) setGroups(todoListGroups.groups);
  }

  async function handleClickRemoveGroup(groupId) {
    const todoListGroups = await todoListGroupsService.removeGroup(id, groupId);
    if (todoListGroups) setGroups(todoListGroups.groups);
  }

  async function handleClickRemoveAllTodoList() {
    const todoListGroups = await todoListGroupsService.removeAllGroups(id);
    if (todoListGroups) setGroups(todoListGroups.groups);
  }

  async function handleClickRestoreAllRemoved() {
    const todoListGroups = await todoListGroupsService.restoreAllRemovedGroups(
      id
    );
    if (todoListGroups) setGroups(todoListGroups.groups);
  }

  async function handleClickRestoreLastRemoved() {
    const todoListGroups = await todoListGroupsService.restoreLastRemovedGroup(
      id
    );
    if (todoListGroups) setGroups(todoListGroups.groups);
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
