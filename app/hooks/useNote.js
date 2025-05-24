"use client"
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useNote = () => {
  
    const [loading, setLoading] = useState(false); 
    const [note, setNote] = useState('');

    const params = useParams(); 
    const {id} = params; 

    const fetchNote = async() => {
        setLoading(true);
        try {
          const res = await fetch(`/api/course/${id}/note`); 
          const data = await res.json();
          if(!res.ok){
             throw new Error(data.error); 
          } else {
            setNote(data.noteSpecific.note); 
          }
        } catch (error) {
           console.log("Erreur lors de la récupération des données", error.message); 
        } finally {
            setLoading(false); 
        }
    }

    const handleSaveNote = async() => {
        setLoading(true);
        try {
            const res = await fetch(`/api/course/${id}/note`, {
                method: "POST", 
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({note})
            });
            const data = await res.json(); 
            if(!res.ok){
                throw new Error(data.error);  
            } else {
                toast.success("Note enregistrée avec succès"); 
            }
        } catch (error) {
            console.log(error.message); 
            toast.error(error.message); 
        } finally {
            setLoading(false); 
        }
    }

    return {loading, note, setNote, fetchNote, handleSaveNote};
}

export default useNote;