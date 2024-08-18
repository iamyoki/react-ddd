import { createContext } from "react";
import { TodoListService } from "../../todoList/services/TodoListService";
import { TodoListGroupsService } from "../services/TodoListGroupsService";

/**@type {React.Context<{
 * todoListService: TodoListService;
 * todoListGroupsService: TodoListGroupsService
 * }>} */
export const TodoListGroupsContext = createContext();
