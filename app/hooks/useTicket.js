import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

const useTicket = () => {


    const [ticketRes, setTicketRes] = useState([]) ; 
    const  [loadingTicket , setLoadingTicket] = useState(false)
    const [nbreUnread, setNbreUnread] = useState(null) ; 
 

 

            const getTicketRes = useCallback(async () => {
            setLoadingTicket(true);
            try {
                const res = await fetch("/api/ticket");
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setTicketRes(data.tickets);
            } catch (error) {
                console.log("Erreur getting user ticketRes", error.message);
            } finally {
                setLoadingTicket(false);
            }
            }, []); // dependance comme ex: userId


    const sendTicket = async({email , content}) =>{
        const success = handleInputsError({email , content})
        if(!success) return ; 
        setLoadingTicket(true)
        try {
            const res = await fetch("/api/ticket" , {
                method : "POST" , 
                headers : {"Content-type" : "application/json"} , 
                body : JSON.stringify({email, content}) 
             })
             const data = await res.json() ; 
             if(!res.ok){
                throw new Error(data.message) ; 
             }
             toast.success("Thank you, we will respond you later") ; 
        } catch (error) {
            toast.error(error.message)
            console.log("Error while sending request" , error.message)
        }finally{
            setLoadingTicket(false) ; 
        }
    }

    // const getNbreUnread = async() =>{
    //     setLoadingTicket(true) ; 
    //        try {
    //             const res = await fetch("/api/ticket/notification") ;
    //             const data = await res.json() ; 
    //             if(data.error) throw new Error(data.error) ; 
    //             setNbreUnread(data.nbreTicketNotifiy) ; 
    //        } catch (error) {
    //             console.log("Erruer getting user ticketRes", error.message) ; 
    //        }finally{
    //             setLoadingTicket(false) ; 
    //        }
    // }

    const getNbreUnread = useCallback(async () => {
        setLoadingTicket(true);
        try {
          const res = await fetch("/api/ticket/notification");
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setNbreUnread(data.nbreTicketNotifiy);   
        } catch (error) {
          console.error("Erreur récupération tickets non lus:", error.message);
        } finally {
          setLoadingTicket(false);
        }
      }, []); 
    

    const markAsSeen = async() =>{
         setLoadingTicket(true) ; 
         try {
             const res = await fetch('/api/ticket/notification' , {
                method : "PUT" 
             })
             getNbreUnread() ;
         } catch (error) {
             console.log("Error while marking seen ticket: " , error.message)
         }finally{
            setLoadingTicket(false) ; 
         }
    }

 

    return {sendTicket , loadingTicket, ticketRes , getTicketRes ,  getNbreUnread , nbreUnread , markAsSeen}
}

export default useTicket

const handleInputsError = ({email, content}) =>{
    if(!email){
        toast.error("Try later, need your email") ; 
        return false ; 
    }
    if(!content){
        toast.error("Enter your request") ; 
        return false ; 
    }
    return true  ; 
}