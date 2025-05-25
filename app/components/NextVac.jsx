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
                      ( <div className='flex items-center  justify-between mt-6'>
                     
                      
                              <div role="status">
                                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                              </div>

                      </div>) 
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