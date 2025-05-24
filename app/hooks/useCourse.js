import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useCourse = () => {
      
    const [courses, setCourses] = useState([]) ; 
    const [loading , setLoading] = useState(false) ; 

    const fetchCourse = async() =>{
        setLoading(true)
        try {
              const res = await fetch("/api/course") ; 
              const data = await res.json() ; 
              if(!res.ok){
                throw new Error(data.message) ; 
              }
              setCourses(data.courses)
        } catch (error) {
            toast.error(error.message) ; 
            console.log("Erreur lors de la récupération des cours") ; 
        }finally{
            setLoading(false) ; 
        }
    }

    const addCourse = async({title}) => {
        const success = handleInputsError({title})
        if(!success) { return }
        setLoading(true)
        try {
            const res = await fetch("/api/course" , {
                method : "POST" , 
                headers : {"Content-type" : "application/json"} , 
                body : JSON.stringify({title}) 
             })
             const data = await res.json() ; 
             if(!res.ok){
                throw new Error(data.message) ; 
             }
             toast.success("Nouveau cours ajouté avec succès") ; 
             fetchCourse() ; 
        } catch (error) {
            toast.error(error.message)
            console.log("Erreur lors de l'ajout du cours", error.message)
        }finally{
            setLoading(false) ; 
        }
    }

    const deleteCourse = async(courseId) => {
        setLoading(true)
        try {
            const res = await fetch("/api/course" , {
                method : "DELETE" , 
                headers : {"Content-type" : "application/json"}, 
                body : JSON.stringify({courseId}) 
            })
            if(!res.ok) throw new Error(res.error) ; 
            toast.success("Cours supprimé avec succès") ; 
            fetchCourse() ; 
        } catch (error) {
             toast.error(error.message) ; 
             console.log("Erreur lors de la suppression du cours et de ses PDFs/notes") ; 
        }finally{
            setLoading(false) ; 
        }
    }

    return {courses , addCourse , fetchCourse , loading, deleteCourse}
}

export default useCourse

function handleInputsError({title}){
    if(!title){
        toast.error("Le titre du cours est requis") ; 
        return false ; 
    }
    return true ; 
}