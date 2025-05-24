"use client"
import { useState } from "react";
import toast from "react-hot-toast";


function Rating() {
  const [rating, setRating] = useState(0); 

  const handleRate = (index) => {
    setRating(index + 1);
  };

  const handleSendRate = async() => {
    
        const res = await fetch('/api/rate', {
            method : "POST", 
            headers : {"Content-type" : "application/json"} , 
            body : JSON.stringify({rating})  
        })
        const data = await res.json() ; 
        if(data.error) throw new Error(data.message) ; 
        if(res.ok){
            toast.success("Merci pour votre retour ") ;
        }else{
            toast.error(data.message) ; 
        }
        
  }

  return (
    <div className="mt-4">
        
      <div className="mb-2 italic ml-2">
        <p className="text-slate-700  "  >Votre avis nous aide à améliorer la plateforme.</p>
      </div>

      <div className="flex justify-between gap-0.5">
       <div className="flex gap-0.5  mt-1">
         {[...Array(5)].map((_, index) => (
          <div key={index} onClick={() => handleRate(index)} >
            <svg
              className={`h-6 w-6 cursor-pointer shrink-0 ${index < rating ? "fill-amber-400" : "fill-gray-300"}`}
              viewBox="0 0 256 256"
            >
              <path d="M239.2 97.4A16.4 16.4 0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4 0 00128 16a16.4 16.4 0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5 0 0016.8 97.4 16.8 16.8 0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5 0 007 19.6 18 18 0 0020.1.6l46.9-29.7 50.5 31.9a16.1 16.1 0 008.7 2.6 16.5 16.5 0 0015.8-20.8l-14.3-58.1L234 115.5a16.8 16.8 0 005.2-18.1z" />
            </svg>
          </div>
        ))}
       </div>
          <button onClick={handleSendRate} className="cursor-pointer border p-0.5 px-1 rounded-md  " > Soumettre</button>
      </div>
      
    </div>
  );
}

export default Rating;
