// "use client";
// import { IoIosNotificationsOutline } from "react-icons/io";
// import { CiSearch } from "react-icons/ci";
// import { VscAccount } from "react-icons/vsc";
// import { MdLogout } from "react-icons/md";
// import { MdArrowBack } from "react-icons/md"; // Icone pour le bouton retour
// import { useSession } from "next-auth/react";
// import { signOut } from "next-auth/react";
// import { useState } from "react";

// const Header = () => {
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   const handleAccount = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex justify-between items-center h-16 w-full shadow-md px-4 md:px-16 relative">
//       {/* Input qui s'adapte */}
//       {isSearchOpen ? (
//         <div className="absolute left-0 top-2 w-[95%] max-w-[300px] flex items-center gap-2">
//           {/* Bouton de retour */}
//           <button
//             className="text-xl text-black"
//             onClick={() => setIsSearchOpen(false)}
//           >
//             <MdArrowBack />
//           </button>
//           {/* Input avec icône de recherche */}
//           <form className="relative w-full">
//             <input
//               autoFocus
//               placeholder="Enter your search"
//               className="w-full pl-4 pr-10 border p-2 rounded-full text-sm"
//               type="text"
//             />
//             <button
//               className="absolute text-black right-3 top-1/2 -translate-y-1/2 text-lg"
//               type="button"
//             >
//               <CiSearch />
//             </button>
//           </form>
//         </div>
//       ) : (
//         <div className="hidden md:block w-1/3">
//           <form className="relative w-full">
//             <input
//               placeholder="Enter your search"
//               className="w-full pl-4 pr-10 border p-2 rounded-full"
//               type="text"
//             />
//             <button
//               className="absolute text-black right-3 top-1/2 -translate-y-1/2 text-xl"
//               type="button"
//             >
//               <CiSearch />
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Icônes à droite */}
//       <div className="flex items-center gap-5 ml-auto">
//         {/* Icône search pour afficher l'input sur petit écran */}
//         {!isSearchOpen && (
//           <button
//             className="text-2xl cursor-pointer md:hidden"
//             onClick={() => setIsSearchOpen(true)}
//           >
//             <CiSearch />
//           </button>
//         )}

//         <div className="text-2xl cursor-pointer">
//           <IoIosNotificationsOutline />
//         </div>

//         <div className="text-2xl cursor-pointer relative">
//           <VscAccount onClick={handleAccount} />

//           {isOpen && (
//             <div className="absolute right-[-60px] top-11 bg-slate-700 text-white w-[250px] h-[300px] border-2 border-black rounded-3xl">
//               <div className="flex flex-col justify-center items-center mt-2">
//                 <span className="text-xl">{session?.user?.username}</span>
//                 <span className="text-xl">{session?.user?.email}</span>
//               </div>
//               <div className="mt-8 flex justify-center">
//                 <MdLogout className="text-2xl" />
//                 <p
//                   onClick={() => signOut()}
//                   className="text-xl cursor-pointer ml-3"
//                 >
//                   Se déconnecter
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


// "use client"
// import React, { useReducer } from 'react'

// const Reduce = () => {

//     // useReducer est une fonction qui reçoit un etat et une action retourne un nouvelle etat 
//     // la particularité de useReducer est de gerer plusieurs etats en meme contrairement à usestatee et evite les re-render unitiles

//     const reducer = (state , action)=> {
//         switch(action.type){
//             case "incr" : return {count : state.count+1} ;
//             case "desc" : return {count : state.count-1}
//             case "reset" : return {count : 0}
//             default : return state ; 
//         }

//     }

//     // reducer l'action et count l'etat initial
//     const [state , dispatch] = useReducer(reducer , {count : 0}) ; 

//   return (
//     <div className='flex justify-center items-center flex-col gap-2'>

//                     <h1>Counteur :  {state.count}   </h1>

//                     <div className='flex gap-3'>
//                         <button onClick={() => dispatch({type : "incr"})}   >Incrementer</button>
//                         <button onClick={() => dispatch({type : "desc"})}> Decrementer</button>
//                         <button onClick={() => dispatch({type : "reset"})}>reset

//                         </button>
//                     </div>
         
//     </div>
//   )
// }

// export default Reduce



//////////////////////////reducer projects


// "use client"
// import React, { useEffect, useState } from 'react'
// import { CiStar } from "react-icons/ci";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import useTodoReducer1 from '@/options/useToReducer1';

// const Todo = () => {
//   const { addTodo, fetchTodos, isOpenPopup, setIsOpenPopup, todos, loading } = useTodoReducer1();
  
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     priority: "medium",
//     deadline: "",
//   });

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   const handleAdd = async () => {
//     await addTodo(formData);
//     setFormData({ title: "", description: "", priority: "medium", deadline: "" });
//     setIsOpenPopup(false);
//   };

//   return (
//     <div>
//       <div className='flex flex-wrap gap-4 md:ml-3 ml-5'>
//         {loading ? (
//           <div className='mt-5' role="status">
//             <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z" fill="currentColor"/>
//               <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//             </svg>
//             <span className="sr-only">Loading...</span>
//           </div>
//         ) : (
//           <>
//             {Array.isArray(todos) && todos.map((todo, index) => (
//   <div key={index} className='h-[14rem] px-4 py-3 flex flex-col gap-4 shadow-md w-[280px] bg-white rounded-lg mt-6'>
//     <div>
//       <h4 className='font-semibold text-2xl'>{todo?.title}</h4>
//       <p>{todo?.description}</p>
//     </div>
//     <div className='mt-auto flex items-center justify-between'>
//       <p className='text-sm text-gray-400'>12/06/2020</p>
//       <p>High</p>
//       <div className='flex items-center gap-3 text-[1.2rem]'>
//         <button className='cursor-pointer'><CiStar /></button>
//         <button className='text-[#00A1F1] cursor-pointer'><FaEdit /></button>
//         <button className='text-[#F65314] cursor-pointer'><MdDelete /></button>
//       </div>
//     </div>
//   </div>
// ))}

//             <button onClick={() => setIsOpenPopup(true)} className='h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-md w-[300px] rounded-lg mt-6 border-2 border-dashed border-gray-400 hover:bg-gray-300 hover:border-none duration-200 ease-in-out'>
//               <h1>Add Task</h1>
//             </button>
//           </>
//         )}
//       </div>

//       {isOpenPopup && (
//         <div className="fixed left-0 top-0 h-full w-full overflow-hidden bg-[rgba(0,0,0,0.35)] flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] z-60 font-serif">
//             <h2 className="text-2xl font-semibold font-sans mb-4">Ajouter une tâche</h2>
//             <div>
//               <label htmlFor="title">Titre: </label>
//               <input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
//                 type="text" name='title' id='title'
//                 placeholder="Titre"
//                 className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]"
//               />
//             </div>
//             <div>
//               <label htmlFor="description">Description: </label>
//               <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 placeholder="Description"
//                 className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]"
//               ></textarea>
//             </div>
//             <div>
//               <label>Priorité:</label>
//               <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})}
//                 className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]">
//                 <option value="low">Faible</option>
//                 <option value="medium">Moyenne</option>
//                 <option value="high">Élevée</option>
//               </select>
//             </div>
//             <div>
//               <label htmlFor="deadline">Date d'échéance: </label>
//               <input value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})}
//                 type="date"
//                 className="border p-2 rounded w-full mb-2 bg-[#f9f9f9]"
//               />
//             </div>
//             <div className="flex justify-end gap-2">
//               <button onClick={() => setIsOpenPopup(false)} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">
//                 Annuler
//               </button>
//               <button onClick={handleAdd} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
//                 Ajouter
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Todo;



 {/* {isOpenPopup && (
        <div className="fixed left-0 top-0 h-full w-full overflow-hidden bg-[rgba(0,0,0,0.30)]  shadow-md shadow-black  flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] z-60">
            <h2 className="text-2xl font-semibold mb-4">Ajouter une tâche</h2>
            <input
              type="text"
              placeholder="Titre"
              className="border p-2 rounded w-full mb-2"
            />
            <textarea
              placeholder="Description"
              className="border p-2 rounded w-full mb-2"
            ></textarea>
             <div>
                <label htmlFor="">Select Priority</label>
                <select name="" id="">
                    <option value="">Urgent</option>
                    <option value="">moderer</option>
                </select>
             </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpenPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Annuler
              </button>
              <button onClick={() => setIsOpenPopup(false)} className="px-4 cursor-pointer py-2 bg-blue-500 text-white rounded">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )} */}
