import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Interface from './Interface'
import { FaTrash } from "react-icons/fa";

function Home() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
  axios.get('http://127.0.0.1:5000/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
}, [])

const handleEdit = (id) => {
  axios.put(`http://127.0.0.1:5000/update/${id}`)
  .then(result => {
      window.location.reload();
  })
  .catch(err => console.log(err))
}

const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/delete/${id}`)
    .then(result => {
        setTodos(todos.filter(todo => todo._id !== id));
    })
    .catch(err => console.log(err));
}

  return (
    <>
      <div className='bg-linear-to-r from-blue-500 to-blue-700 py-8 px-4 text-center shadow-md'>
        <h1 className='text-white text-3xl sm:text-4xl font-extrabold tracking-wide drop-shadow'>
          Todo List
        </h1>
        <p className='text-blue-100 text-sm sm:text-base mt-1 font-medium tracking-widest uppercase'>
          My Tasks
        </p>
      </div>
      
      <Interface />

      {todos.length === 0 ? (
        <p className='text-center text-sm sm:text-base mt-4'>No task add yet</p>
      ) : (
        <div className='flex flex-col items-center px-4 sm:px-8 gap-2 pb-6'>
          {todos.map((todo) => (
            <div 
              key={todo._id} 
              className='flex items-center justify-between w-full max-w-md bg-blue-600 text-white p-3 rounded px-3'
            >
              <div className='flex items-center gap-2'>
                <input 
                  type="checkbox" 
                  checked={todo.done} 
                  onChange={() => handleEdit(todo._id)} 
                  className='cursor-pointer'
                />
                <span className={`text-sm sm:text-base wrap-break-word  max-w-55 sm:max-w-xs ${todo.done ? "line-through text-white" : ""}`}>
                  {todo.task}
                </span>
              </div>

              <button 
                className='text-white cursor-pointer ml-2 shrink-0' 
                onClick={() => handleDelete(todo._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Home