import React from 'react'
import { useState } from 'react'
import {useTodo} from '../context/TodoContext'
const TodoItem = ({todo}) => {
    const [isTodoEditable, setisTodoEditable]= useState(false);
    const [todoMsg, settodoMsg]= useState(todo.todo)

    const {updateTodo, deleteTodo, toggleComplete} = useTodo()

    const editTodo=()=>{
       updateTodo(todo.id, {...todo, todo:todoMsg})
       setisTodoEditable(false)
    }
    const toggleCompleted=()=>{
   toggleComplete(todo.id)
    }
  return (
    <div
    className={`flex border vorder-black/10 rounded-lg px-3 py-1.5 gap-x-3 sg=hadow shadow-white/50 duration:100
      text-black ${
        todo.completed?"bg-[#123456]":"bg-[#245671]"
      }  `
        }
    >
        <input type="checkbox" 
        classname="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
        />
        <input type="text "
        className={`border outline-none w-full bg-transparent rounded-lg
          ${
            isTodoEditable?"border-black/10":"border-transparent"
          } 
          ${
            todo.completed?"line-thoungh"  :" " 
          } `}
          value ={todoMsg}
          onChange={(e)=>settodoMsg(e.target.value)}
           readOnly={!isTodoEditable}
        />
        <button
         className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50
         hover-bg-gray-100 shrink-0 disabbled:opacity-50 ' 
         
         onClick={()=>{
            if(isTodoEditable){
                editTodo();

            }
            else{
                setisTodoEditable((prev)=>!prev)
            }
         }}
         disabled={todo.completed}
        >
          {isTodoEditable ? 'Save' : 'Edit'}
        </button>

        <button
        className='inline-flex w-8 h-8 rounded-lg text-sm hover-bg-gray-100 shrink-0 border-black/10 justfy-center items-center bg-gray-50'
        onClick={()=>deleteTodo(todo.id)}
        > del</button>
    </div>
  )
}


export default TodoItem