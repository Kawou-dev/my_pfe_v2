import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useTodo = () => {
    const [urgs, setUrgs] = useState([]) ; 
    const  [loadingTodo , setLoadingTodo] = useState(false) ;

    const fetchUrgTodo = async() => {
                 setLoadingTodo(true) ; 
                try {
                     const res = await fetch("/api/urgentTodo") ; 
                    const data = await res.json() ; 
                    if(!res.ok) throw new Error(data.message) ;
                    setUrgs(data.urgsTodo); 
                } catch (error) {
                    toast.error(error.message) ; 
                    console.log(error.message) ; 
                }finally{
                    setLoadingTodo(false) ; 
                }
    }


    const deleteUrgTodo = async(id) => {
            setLoadingTodo(true) ; 
           try {
               const res = await fetch("/api/urgentTodo" , {
                   method : "DELETE" , 
                   headers : {"Content-type" : "application/json"} ,
                   body : JSON.stringify({id})
               })
               if(!res.ok) throw new Error(res.error) ; 
               toast.success("Todo deleted successfully") ; 
               fetchUrgTodo() ; 
           } catch (error) {
              console.log("Erreur deleting urg todo:" , error.message) ; 
           }
    }



    return {fetchUrgTodo , urgs , deleteUrgTodo , loadingTodo} ;
       
}

export default useTodo
