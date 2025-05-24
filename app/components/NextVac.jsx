import React, { useEffect, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import toast from 'react-hot-toast';
import useVacance from '../hooks/useVacance';
import { RiChatDeleteLine } from 'react-icons/ri';

const NextVac = () => {
 
  const [isOpen, setIsOpen] = useState(false);

  const {addNextVac , fetchNextVac , nextVacs , loading , onDeleteNextVAC}  = useVacance() ; 
  

  const [inputs, setInputs] = useState({
    cityName: '',
    prevDate: '',
    priority: 'Haute'
  });

  useEffect(() => {
       fetchNextVac() ; 
  }, [])

  const openPopup = () => setIsOpen(true);
  

  const closePopup = () => {
    setIsOpen(false);
    setInputs({
      cityName: '',
      prevDate: '',
      priority: 'faible'
    });
  };

  const handleAddNextVac = async () => {
    if (!inputs.cityName || !inputs.prevDate) return;
    await addNextVac(inputs) ;
     closePopup() ;  

  };

  const handleDeleteNexVac =  async(vacId) => {
      await onDeleteNextVAC(vacId)
  }

  // Si le popup n'est pas ouvert, afficher le bouton pour l'ouvrir
  if (!isOpen) {
    return (

      <div>
      <button
        onClick={openPopup}
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
      >
        Ajouter une destination
      </button>

         <div className="mb-4 sm:mb-6">
                <div className=" mt-5 w-[90%] mx-auto  ">
                     <h3 className="font-semibold text-xl mt-2 text-gray-700 mb-2">Villes planifiées</h3>
                 
                    <div >
                      {loading ? 
                      (<div>Loading... </div> ) 
                      : 
                      (<div className="flex flex-wrap gap-2 mt-5 ">
                             {nextVacs.map((vac, index) => (
                        <div  key={index}     
                          className={`p-2 sm:p-3 rounded-lg border w-40 h-28   ${vac.priority === "Haute" 
                            ? "bg-red-50 border-red-200" 
                            : vac.priority === "Moyenne" 
                            ? "bg-amber-50 border-amber-200" 
                            : "bg-blue-50 border-blue-200"}`}
                        >
                          <div className="font-medium text-sm sm:text-base flex justify-between items-center my-0.5 ">
                            
                            {vac.cityName}  
                            <span onClick={() => handleDeleteNexVac(vac._id)} className="text-red-500  cursor-pointer"><RiChatDeleteLine /></span>     </div>

                            <div className="text-xs sm:text-sm text-gray-500">
                            {new Date(vac.prevDate).toLocaleDateString("fr-FR", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className={`text-xs mt-1 ${
                              vac.priority === "Haute" 
                              ? "text-red-600" 
                              : vac.priority === "Moyenne" 
                              ? "text-amber-600" 
                              : "text-blue-600"}`}
                          >
                            {vac.priority} priorité
                          </div>
                        </div>
                      ))}
                      </div>   
                    
                    )}
                   
                   
                    </div>
                  
                  
                  
                  </div>
              </div>



</div>

      
    );
  }

  // Le contenu du popup
  return (
    <div>
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Prochain vacance
          </h2>
          <button 
            onClick={closePopup} 
            className="text-gray-500 hover:text-red-500 transition"
            aria-label="Close"
          >
            <IoIosCloseCircle size={28} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu</label>
            <input
              type="text"
              value={inputs.cityName}
              onChange={(e) => setInputs({ ...inputs, cityName: e.target.value })}
              placeholder="Rabat, Conakry..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={inputs.prevDate}
              onChange={(e) => setInputs({ ...inputs, prevDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Priorité*</label>
            <select
              value={inputs.priority}
              onChange={(e) => setInputs({ ...inputs, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAddNextVac}
          disabled={!inputs.cityName || !inputs.prevDate}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition mt-6 ${
            !inputs.cityName || !inputs.prevDate
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Ajouter
        </button>
      </div>
    </div>

   

    </div>
  );
};

export default NextVac;