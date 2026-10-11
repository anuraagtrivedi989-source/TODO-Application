import { createContext, createElement, useContext, useEffect, useState } from "react";
import { addTask, getAllTasks, removeTask, updateTask } from "../api";

export const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        setError("");
        setTodos(await getAllTasks());
      } catch (requestError) {
        setError(requestError.message || "Unable to load tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  async function addingTask(title) {
    try {
      setError("");
      const task = await addTask(title);
      setTodos((currentTodos) => [task, ...currentTodos]);
      return true;
    } catch (requestError) {
      setError(requestError.message || "Unable to add task");
      return false;
    }
  }

  async function updateTodo(id, updates) {
    try {
      setError("");
      const task = await updateTask(id, {
        title: updates.todo ?? updates.title,
        completed: updates.completed,
      });
      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === id ? task : todo)),
      );
    } catch (requestError) {
      setError(requestError.message || "Unable to update task");
    }
  }

  async function toggleComplete(id) {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;

    await updateTodo(id, { completed: !todo.completed });
  }

  async function deleteTodo(id) {
    try {
      setError("");
      await removeTask(id);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (requestError) {
      setError(requestError.message || "Unable to delete task");
    }
  }

  const value = {
    todos,
    loading,
    error,
    addingTask,
    addTodo: addingTask,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return createElement(TodoContext.Provider, { value }, children);
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }

  return context;
}
