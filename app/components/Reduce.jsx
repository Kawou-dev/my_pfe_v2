"use client"
import React, { useReducer, useState } from 'react'

const Reduce = () => {


    const reducer = (state , action) => {
        switch(action.type){
            case "add" :  {
                const newTodo = {
                    id : state.todos.length+1 , 
                    title :  todo
                }
                return   {todos : [...state.todos , newTodo]}   ; 
            }
            case  "rem" : {
                 const todos  = state.todos.filter(todo => todo.id !== action.playload) ; 
                 return {todos : todos}; 
            }
            case  "edit" : return ; 
            default : return state ; 
        }
    }

    const [todo , setTodo] = useState("")
    const [state, dispatch] = useReducer(reducer , {todos : []} ) ; 

    const handleSubmit = (e) => {
        e.preventDefault() ; 
         dispatch({type: "add"})
    }

    const handleRemove = (id) => {
         dispatch({type: "rem"  , playload : id}  )
   }
   
   


  return (
    <div className='flex justify-center items-center flex-col gap-2'>
                    <h1>All your todo</h1>

                        <form  onSubmit={handleSubmit}     >
                            <input className='border-2 border-black '
                              type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                            <button  className='border-2 border-black cursor-pointer ' type='submit'>Ajouter+</button>
                        </form>

                     <div className=' '>
                        {state.todos.map((task) => (
                        <li key={task.id}>
                            {task.id}- 
                            {task.title}   <button onClick={() => handleRemove(task.id)} className='border-2 px-2'> X</button>
                        </li>
                    ))}
                     </div>


    </div>
  )
}

export default Reduce
