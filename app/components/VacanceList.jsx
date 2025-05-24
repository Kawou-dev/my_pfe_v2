import React, { useEffect } from 'react'
import useVacance from '../hooks/useVacance'

const VacanceList = () => {

  const {fetchVacance , vacances , loading } = useVacance() ;
  
   useEffect(() => {
          fetchVacance() ; 
   }, [])

    

  return (
    <div className='mt-5'>
             <div>
                   <h1 className='text-2xl font-semibold'>Vos vacances</h1>
                   <p>Voici la liste des villes que vous avez visité d'abord</p>
             </div>
             <div>
                   {vacances.map((vac, index) => (
                    <div key={index}>
                        <ul >
                           <li > {vac.cityName}    </li>
                        </ul>
                    </div>
                   ))}
             </div>
    </div>
  )
}

export default VacanceList
