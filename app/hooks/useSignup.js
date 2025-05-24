
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useSignup = () => {

    const [loading , setLoading] = useState(false) ; 
    const router = useRouter() ;  

    const signup = async ({username , email , password , confirmPassword , gender}) => {
         setLoading(true) ; 
        try {
            const succes = handleInputsError({username , email , password , confirmPassword , gender}) ; 
            if(!succes){
                return ; 
            }

            const resUserExist = await fetch("/api/userExist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            });
            
            const data1 = await resUserExist.json();
            
            if (!resUserExist.ok) {
                console.log("Error -> user exist:" , data1.message)
                throw new Error(data1.message)
                return;
            }
       
            const res = await fetch("/api/register" , {
                method : "POST" , 
                headers : {"Content-Type" : "application/json"} , 
                body : JSON.stringify({username , email , password , confirmPassword , gender})
            })

            const data = await res.json() ;
            
            if(!res.ok){
                console.log("Error registration " , data.message) ; 
                throw new Error(data.message) ; 
                return ; 
            }
            
            if(data.error) throw new Error(data.error) ; 
            if(res.ok){
                 toast.success("Registred successfully")
                 router.replace("/login") 
            }
            
        } catch (error) {
            toast.error(error.message)    
        }finally{
            setLoading(false)
        }
        
    }


    return {loading , signup}
  
}

export default useSignup

function handleInputsError ({username , email , password , confirmPassword , gender}){
    if( !username || !email || !password  ||  !confirmPassword  || !gender  ){
        toast.error("All fields are required") ; 
        return false ; 
    }
    if(password !== confirmPassword) {
        toast.error("Password do not match !") ; 
        return false ; 
    }
    if(password.length < 6){
        toast.error("Password must contain 6 charactères") ; 
    }
    return true ; 
}
