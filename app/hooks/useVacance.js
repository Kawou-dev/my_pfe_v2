
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useVacance = () => {
            const [loading, setLoading] = useState(false) ; 
            const [vacances , setVacances] = useState([]) ; 
            const [favorisVac, setFavorisVacance ] = useState([]) ; 
            const [nextVacs , setNextVacs] = useState([]) ; 
            const [nextVacDashboard, setNextVacDashboard] = useState([]) ; 


            const fetchVacance = async() => {
                setLoading(true) ; 
                try {
                    const res = await fetch("/api/vacance") ; 
                    const data = await res.json() ; 
                    if(data.error) throw new Error(data.error)
                    setVacances(data.vacances)
                } catch (error) {
                    console.log("frontent-Erreur getting data " , error.message)
                    toast.error(error.message)
                }finally{
                    setLoading(false)
                }

            }
            const fetchFavoriVacance = async() => {
                setLoading(true) ; 
                try {
                    const res = await fetch("/api/vacance/favori") ; 
                    const data = await res.json() ; 
                    if(data.error) throw new Error(data.error)
                    setFavorisVacance(data.favoris)
                } catch (error) {
                    console.log("frontent-Erreur getting favoris vacances " , error.message)
                    toast.error(error.message)
                }finally{
                    setLoading(false)
                }
            }

            const addVacance = async({cityName , experience , images , publicId}) => {
                  if (!cityName || !images)  {
                             toast.error("fields are required!");
                             return;
                         }
                         setLoading(true);
                         try {
                             const res = await fetch("/api/vacance", {
                                 method: "POST",
                                 headers: { "Content-Type": "application/json" },
                                 body: JSON.stringify({cityName , experience , images , publicId}),
                             });
                 
                             const data = await res.json();
                             if (data.error) throw new Error(data.error);
                 
                             toast.success("Vacance added successfully");
                             fetchVacance() ; 
                            
                         } catch (error) {
                             console.error("frontent-Erreur sending data:", error.message);
                             toast.error(error.message)
                         } finally {
                             setLoading(false);
                         }
            }

            const setFavori = async(id) => {
                setLoading(true) ; 
                try {
                    const res = await fetch("/api/vacance", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({id}),
                    });
                    const data = await res.json( ) ; 
                    if(data.error) throw new Error(data.message) ; 
                    if(res.ok){
                        toast.success("Vacance updated!")
                        fetchVacance() ; 
                    }
                } catch (error) {
                    console.log("Error while setting favori ")
                    toast.error(error.message)
                }finally{
                    setLoading(false) ; 
                }
            }


            const onDelete = async(publicId) => {
                setLoading(true) ; 
                try {
                    const res = await fetch("/api/vacance", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({publicId}),
                    });
                    const data = await res.json( ) ; 
                    if(data.error) throw new Error(data.message) ; 
                    if(res.ok){
                        toast.success("Vacance deleted !")
                        fetchVacance() ; 
                    }
                } catch (error) {
                    console.log("Error while deleting vacance favori ")
                    toast.error(error.message)
                }finally{
                    setLoading(false) ; 
                }
            }

            const fetchNextVac = async() => {
                setLoading(true) ; 
                try {
                    const res = await fetch('/api/vacance/prochain') ; 
                    const data = await res.json() ; 
                    if(data.error) throw new Error(data.message) ; 
                    setNextVacs(data.nextVacances) ; 
                } catch (error) {
                    console.log("Error while fetching nexts vacances ")
                    toast.error(error.message)
                }finally{
                    setLoading(false) ;
                }
            }
            
        
            const addNextVac = async ({ cityName, prevDate, priority }) => {
                setLoading(true);
                try {
                    const success = handleInputsError({ cityName, prevDate, priority });
                    if (!success) return;

                    const res = await fetch("/api/vacance/prochain", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ cityName, prevDate, priority }),
                    });

                    const data = await res.json();
                    if (!res.ok || data.error) throw new Error(data.message || "Erreur lors de l'ajout");

                    toast.success("Next Vacance added successfully");
                    fetchNextVac(); 
                } catch (error) {
                    console.error("Error while adding nextVac:", error.message);
                    toast.error(error.message);
                } finally {
                    setLoading(false);
                }
            };

           
            const onDeleteNextVAC = async(NextVacId) => {
                setLoading(true) ; 
                try {
                    const res = await fetch("/api/vacance/prochain", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({NextVacId}),
                    });
                    const data = await res.json( ) ; 
                    if(data.error) throw new Error(data.message) ; 
                    if(res.ok){
                        toast.success("Prochain Vacance deleted !")
                        fetchNextVac() ;  
                    }
                } catch (error) {
                    console.log("Error while deleting vacance favori ")
                    toast.error(error.message)
                }finally{
                    setLoading(false) ; 
                }

            }

            const fetchNextVacDashboard = async()=> {
                 setLoading(true) ; 
                try {
                    const res = await fetch('/api/vacance/prochain') ; 
                    const data = await res.json() ; 
                    if(data.error) throw new Error(data.message) ; 
                    setNextVacDashboard(data.nextVacances) ; 
                } catch (error) {
                    console.log("Error while fetching nexts vacances ")
                    toast.error(error.message)
                }finally{
                    setLoading(false) ;
                }
            }
            


     return {loading , vacances , fetchVacance, addVacance , setFavori, fetchFavoriVacance, favorisVac , onDelete, fetchNextVac , nextVacs , addNextVac , onDeleteNextVAC , fetchNextVacDashboard , nextVacDashboard}
}

export default useVacance

const handleInputsError = ({cityName , prevDate , priority}) => {
    if(!cityName){
        toast.error("CityName is required")
        return false ; 
    }
    if(!prevDate){
        toast.error("Date is required")
        return false ; 
    }
     if(!priority){
        toast.error("Priority is required")
        return false ; 
    }
    return true ; 
}
