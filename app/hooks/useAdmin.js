import React, { useState } from 'react'

const useAdmin = () => {
 
    const [loadingAdmin , setLoadingAdmin ] = useState() ;
    const  [adminTicket, setAdminTicket] = useState([]) 

    const getAdminTicket = async() => {
        setLoadingAdmin(true) ; 
        try {
             const res = await fetch("/api/ticket/reply") ;
             const data = await res.json() ; 
             if(data.error) throw new Error(data.error) ; 
             setAdminTicket(data.tickets) ; 
        } catch (error) {
             console.log("Erruer getting user ticketRes", error.message) ; 
        }finally{
            setLoadingAdmin(false) ; 
        }
 }

 return {loadingAdmin , adminTicket , getAdminTicket}


}

export default useAdmin
