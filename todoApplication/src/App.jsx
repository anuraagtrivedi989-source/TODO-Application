import './App.css'
import { TodoProvider, useTodo } from './context/TodoContext'
import { AddedTask, TodoForm } from './components'

function TodoContent() {
  const { todos, error, loading } = useTodo()

  return (
    <div className="bg-black min-height-screen py-8">
      <div className="w-full shadow-md max-w-2xl mx-auto rounded-xl px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-5 mt-3">
          Manage Your Todo
        </h1>

        <div className="mb-4">
          <TodoForm />
        </div>

        {error && <p role="alert" className="mb-4 text-red-300">{error}</p>}

        <AddedTask todos={todos} loading={loading} />
      </div>
    </div>
  )
}

function App() {
  return (
    <TodoProvider>
      <TodoContent />
    </TodoProvider>
  )
}

export default App
