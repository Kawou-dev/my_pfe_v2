"use client";
import React, { useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useTodoReducer1 from "@/options/useToReducer1";

const Todo = () => {
  
   
    const [isEditing, setIsEditing] = useState(false)
    const { todos, loading, isOpenPopup, setIsOpenPopup, fetchTodos, addTodo , editTodo , deleteTodo , completeTodo } = useTodoReducer1();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "faible",
        deadline: ""
    });

    // Lifecycle method to fetch todos on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    // Display popup for adding a task
    const displayPopup = () => {
      setIsEditing(false);  // Désactive le mode édition
     setFormData({ title: "", description: "", priority: "faible", deadline: "" }); 
      setIsOpenPopup(true);
    };

    // Handle adding a new todo
    const handleAdd = async () => {
      
        await addTodo(formData);
        console.log(formData)
    };
    const handlePopup = (todo) => {
      setIsEditing(true);
      setFormData(todo); 
      setIsOpenPopup(true); 
    }

    const handleEdit = async(formData) => {
         await  editTodo(formData)
         setIsOpenPopup(false)
    }
    const handleDelete = async(id) => {
          await deleteTodo(id)
    }
    const handleComplete = async(todo) => {
         await completeTodo(todo._id)
   
      
    }

    return (
        <div>
        
            
            <div className="flex flex-wrap gap-4 md:ml-3 ml-5">
                {loading ? (
                    <div className="flex justify-center w-full mt-3">
                          <div className="mt-5" role="status">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    </div>
                ) : (
                    <>
                        {todos.length > 0 ? (
                            todos.map((todo, index) => (
                                <div key={index} className="h-[14rem] px-4 py-3 flex flex-col gap-4 shadow-md w-[280px] bg-white rounded-lg mt-6">
                                    <div>
                                        <h4 className="font-semibold text-2xl">{todo?.title }</h4>
                                        <p className="mt-1">{todo?.description}</p>
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                    {todo?.deadline ? new Date(todo.deadline).toLocaleDateString('fr-FR') : "No deadline"}
                                        <p>{todo?.priority || "Low"}</p>
                                        <div className="flex items-center gap-3 text-[1.2rem]">
                                        <button  onClick={() => handleComplete(todo) }  className={` ${todo?.isCompleted  ? 'bg-green-600' : 'bg-red-600' }  cursor-pointer rounded-full    `}     ><CiStar /></button>

                                            {/* <button onClick={() => handleComplete(todo)}    className={`cursor-pointer ${todo?._id && starColors[todo._id] ? "bg-green-500" : "bg-red-400"}  rounded-full   `} ><CiStar /></button> */}
                                            <button onClick={() => handlePopup(todo)} className="text-[#00A1F1] cursor-pointer"><FaEdit /></button>
                                            <button onClick={() => handleDelete(todo._id)} className="text-[#F65314] cursor-pointer"><MdDelete /></button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            !loading &&  <div className="m-5 flex justify-between">
                                    <h1 className="text-2xl">Aucune tâche pour le moment</h1>
                            </div>
                        )}

                        <button
                            onClick={displayPopup}
                            className="h-[14rem] px-4 py-3 flex flex-col items-center justify-center gap-4 shadow-md w-[280px] rounded-lg mt-6 border-2 border-dashed border-gray-400 hover:bg-gray-300 hover:border-none duration-200 ease-in-out"
                        >
                            <h1>Ajouter une tâche</h1>
                        </button>
                    </>
                )}

               
            </div>
                    {/*  Button add small device    */}
            <div className=" md:hidden absolute rounded-full cursor-pointer bg-gray-800   bottom-20 right-10 flex justify-end items-end flex-col    ">
                    <button onClick={displayPopup} className="text-2xl text-white w-11 h-11 cursor-pointer  border-transparent rounded-full  ">+</button>
                </div>

            {/* Popup*/}
            {isOpenPopup && (
                <div className=" fixed left-0 top-0 h-full w-full overflow-hidden bg-[rgba(0,0,0,0.35)] flex justify-center items-center z-50">
                    <div className="   bg-white p-6 rounded-lg shadow-lg md:w-[400px]  md:h-[460px]  z-60 font-serif">
                        <h2 className="text-2xl font-semibold font-sans mb-4">{isEditing ? "Editer une tâche" : "Ajouter une tâche"   }    </h2>
                        <div>
                            <label htmlFor="">Titre: </label>
                            <input
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Titre"
                                className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]"
                            />
                        </div>
                        <label htmlFor="">Description: </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description"
                            className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]"
                        ></textarea>
                        <div>
                            <label>Priorité:</label>
                            <select
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]"
                            >
                                <option value="faible">Faible</option>
                                <option value="moyenne">Moyenne</option>
                                <option value="élevé">Élevée</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Date d'échéant: </label>
                            <input
                                value={formData.deadline}
                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                type="date"
                                className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsOpenPopup(false)} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Annuler</button>
                            <button onClick={ isEditing ? ()=> handleEdit(formData) :  () => handleAdd()  } className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"> {isEditing ? "Editer" : "Ajouter"}   </button>
                            {/* <button onClick={() => handleAdd(formData)} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"> {isEditing ? "Editer" : "Ajouter"}   </button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
