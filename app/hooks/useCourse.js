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
            console.log("Error getting course") ; 
        }finally{
            setLoading(false) ; 
        }
    }


    const addCourse = async({title}) => {
        const success = handleInputsError({title})
        if(!success)    {return }
        setLoading(true)
        try {
            const res = await fetch("/api/course" , {
                method : "POST" , 
                headers : {"Content-type" : "application/json"} , 
                // body : JSON.stringify({title , notes}) 
                body : JSON.stringify({title}) 
             })
             const data = await res.json() ; 
             if(!res.ok){
                throw new Error(data.message) ; 
             }
             toast.success("New cours added successfully") ; 
             fetchCourse() ; 
        } catch (error) {
            toast.error(error.message)
            console.log("Error adding new course" , error.message)
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
            toast.success("Course deleted successfully") ; 
               fetchCourse() ; 
        } catch (error) {
             toast.error(error.message) ; 
             console.log("Error deleting the course and it's pdfs and notes") ; 
        }finally{
            setLoading(false) ; 
        }
    }

    return {courses , addCourse , fetchCourse , loading, deleteCourse}
}


export default useCourse


function handleInputsError({title}){
    if(!title){
        toast.error("Title of the course required") ; 
        return false ; 
    }
    return true ; 
}