import React, { useState } from 'react';
import axios from 'axios';

function Interface() {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    axios.post('http://127.0.0.1:5000/add', { task })
      .then(() => {
        window.location.reload(); 
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row p-4 sm:p-8 justify-center items-center gap-2 sm:gap-0 w-full'>

        <input 
          type="text" 
          placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)} 
          className='bg-gray-50 w-full sm:w-80 h-12 rounded-l-lg shadow-sm border border-gray-300 sm:border-none p-2 box-border outline-none focus:ring-2 focus:ring-blue-500 rounded sm:rounded-none text-sm sm:text-base' 
        />

        <button 
          className='rounded-r-lg bg-blue-600 text-white h-12 w-full sm:w-auto px-6 cursor-pointer flex items-center justify-center border-none font-semibold hover:bg-blue-700 transition-colors rounded sm:rounded-none text-sm sm:text-base' 
          type='button' 
          onClick={handleAdd}
        >
          Add
        </button>

      </div>
    </>
  );
}

export default Interface;