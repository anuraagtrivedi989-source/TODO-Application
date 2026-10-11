import { useState } from 'react'
import { useTodo } from '../context/TodoContext'

const TodoForm = () => {
    const [todo, setTodo] = useState("");
    const { addingTask } = useTodo()

    const add = async (event) => {
        event.preventDefault()
        const title = todo.trim()
        if (!title) return

        if (await addingTask(title)) {
            setTodo("")
        }
    }

    return (
        <form onSubmit={add} className='flex'>
            <input type="text"
                placeholder="write your task"
                value={todo}
                className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1'
                onChange={(e) => setTodo(e.target.value)
                }
            />
            <button type="submit" className='rounded-r-lg px-3 py-5 bg-green-900 text-white shrink-0 '>
                Add
            </button>
        </form>
    )
}

export default TodoForm