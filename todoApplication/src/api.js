const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:3000").replace(/\/+$/, "");

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "The request failed");
  }

  return data;
}

function normalizeTask(task) {
  return {
    ...task,
    id: task._id ?? task.id,
    todo: task.title ?? task.todo ?? "",
  };
}

export async function addTask(title) {
  const result = await request("/api/tasks/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });

  return normalizeTask(result.data);
}

export async function getAllTasks() {
  const result = await request("/api/tasks/task");

  if (!Array.isArray(result.tasks)) {
    throw new Error("The server returned an invalid task list");
  }

  return result.tasks.map(normalizeTask);
}

export async function updateTask(id, updates) {
  const result = await request(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  return normalizeTask(result.data);
}

export function removeTask(id) {
  return request(`/api/tasks/${id}`, { method: "DELETE" });
}
