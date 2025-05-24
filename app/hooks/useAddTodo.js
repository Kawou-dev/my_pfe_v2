import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const useAddTodo = () => {
    const [loading, setLoading] = useState(false) 
    const [isOpenPopup, setIsOpenPopup] = useState(false)
    const addTodo = async ({ title, description, priority, deadline }) => {
        const success = handleError({ title, description, priority, deadline });
        if (!success) return;
      
        setLoading(true);
        console.log({ title, description, priority, deadline });
      
        try {
          const res = await fetch('/api/todo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description, priority, deadline })
          });
      
          const data = await res.json();
          if (data.error) throw new Error(data.error);
      
          if (res.status === 201) { 
            toast.success("Tâche ajoutée avec succès");
            setIsOpenPopup(false)
          }
        } catch (error) {
          console.log("frontend:", error.message);
        } finally {
          setLoading(false); 
        }
      };
      
    return {loading, isOpenPopup ,setIsOpenPopup ,   addTodo} ; 
}

export default useAddTodo

function handleError({ title, description, priority, deadline }){
    if(!title || !description || !priority || !deadline ){
        toast.error("Tous les champs sont obligatoires !"); 
        return false; 
    }
    return true; 
}