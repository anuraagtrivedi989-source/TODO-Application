import { useState } from 'react'
import TodoItem from './TodoItem'

const AddedTask = ({ todos = [], loading = false }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredTodos = todos.filter((todo) =>
    (todo.todo ?? todo.title ?? '')
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase()),
  )

  return (
    <section aria-labelledby="added-tasks-heading">
      <div className="mb-4">
        <label
          htmlFor="task-search"
          className="mb-2 block text-left text-sm font-medium text-slate-200"
        >
          Search tasks
        </label>
        <input
          id="task-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by task name..."
          className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
        />
      </div>

      <h2
        id="added-tasks-heading"
        className="mb-3 text-left text-lg font-semibold text-white"
      >
        Added tasks
      </h2>

      {loading ? (
        <p className="py-6 text-center text-slate-300">Loading tasks...</p>
      ) : filteredTodos.length > 0 ? (
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="rounded-xl border border-white/15 bg-slate-900 p-2 shadow-lg"
            >
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-white/20 px-4 py-6 text-center text-slate-400">
          {searchTerm.trim()
            ? 'No tasks match your search.'
            : 'No tasks added yet.'}
        </p>
      )}
    </section>
  )
}

export default AddedTask