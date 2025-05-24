import React, { useEffect, useState } from 'react'
import useFetchTodos from '../hooks/useFetchTodos'

const TodoList = () => {

    const {loading, todos} = useFetchTodos() ; 
    const [todo, setTodo] = useState([]) ; 
    const [search, setSearch] = useState("") ;

    useEffect(() =>{
            setTodo(todos)
    }, [todos])


    const searchedTodo = todo.filter( (todo) => todo.title.toLowerCase().includes(search.toLocaleLowerCase())  )



  return (
    <div>
        <div>
            <h1 className='text-2xl font-semibold'>Toutes vos taches</h1>
            <div>
                {loading ? (
                    <div>
                        <p> Chargement... </p>
                    </div>
                ): (
                    <div>
                                 
                                 <div className="overflow-x-auto shadow-md sm:rounded-lg p-4">

  <div className="relative mb-4">
    <input
      type="text"  value={search} onChange={(e) => setSearch(e.target.value)}
      id="table-search"
      className="w-full p-3 pl-10 text-gray-900 border border-gray-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Rechercher une tàche..."
    />
    <svg
      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  </div>
  
  {/* Tableau */}
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th className="px-6 py-3">Nom</th>
        <th className="px-6 py-3">Catégorie</th>
        <th className="px-6 py-3">Etat</th>
      
        <th className="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      
            {searchedTodo.map((task, index) => (
                 <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {task.title}
                 </td>
                 <td className="px-6 py-4"> {task.priority} </td>
                 <td className="px-6 py-4">  { task.isCompleted ? "Terminé" : "En cours"  }  </td>
          
                 <td className="px-6 py-4">
                   <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                     Modifier
                   </a>
                 </td>
               </tr>
            ))}
     
     
    </tbody>
  </table>
</div>

                        
                       
                    </div>
                )}
            </div>
        </div>
         
    </div>
  )
}

export default TodoList
