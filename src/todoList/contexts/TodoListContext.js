import { createContext } from "react";
import { TodoListService } from "../services/TodoListService";

/**@type {React.Context<{
 * todoListService: TodoListService;
 * }>} */
export const TodoListContext = createContext();
