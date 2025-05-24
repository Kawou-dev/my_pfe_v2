"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "./Slider"; 
import useVacance from "../hooks/useVacance";
import { AiFillPicture } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";

const Home = () => {

  const [pictures, setPictures] = useState([]);

  const [uploading, setUploading] = useState(false);

  

  const [inputs, setInputs] = useState({
      cityName : "" , 
      experience : "" , 
      images : [] 
  })

  const [openPopupVac, setOpenPopupVac] = useState(false)
   
    const {loading , vacances , fetchVacance , addVacance } = useVacance() ; 



   useEffect(() => {
         fetchVacance() ; 
   }, [])

   const handlePopup = () => {
        setOpenPopupVac(!openPopupVac)
   }

   const handleAdd = async() => {
       await addVacance(inputs)
       setInputs({...inputs , cityName : "" , experience : "" , images : []}) ; 
       setPictures([]) ; 
      //  console.log(inputs)
   }

  

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedImages = [];

    for (let i = 0; i < Math.min(files.length, 3); i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "todo_test");
      formData.append("cloud_name", "dvnsrfsic");

      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dvnsrfsic/image/upload",  formData );
        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        console.error("Erreur d'upload : ", error);
      }
    }

    setPictures(uploadedImages);
    setInputs({...inputs , images :uploadedImages})
    setUploading(false);
  };

  const handleAddTask = () => {
    if (name.trim() === "" || pictures.length === 0) {
      alert("Please fill out both fields before adding a task.");
      return;
    }

    setTasks([...tasks, { name, pictures }]);
    setName("");
    setPictures([]);
  };


  const handleShareTask = (vac) => {
    const imagesWithTitles = vac.images
      .map((url, index) => `*🖼️ Image ${index + 1}* : ${url}`)
      .join("\n");
  
    const message = `Vacance: *${vac.cityName}*\n\n${imagesWithTitles}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  
  


  return (
    <div className="flex flex-col gap-5 p-5">

       <div className="relative top-[-40px]  right-[-30px] ">
          <div className=" absolute  top-[0px]  right-1 ">
              <button className="border-2 text-xl rounded-2xl p-2 px-3 cursor-pointer bg-green-500 hover:bg-green-700 text-white    " onClick={handlePopup}> {openPopupVac ? 'Annuler' : 'Ajouter Vac'}   </button>
            </div>
       </div>
  
        

  {/* Div pour ajouter un vacance */}
      {openPopupVac && (
          <div>
          <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="mb-6 text-center relative">
                <div onClick={handlePopup} className="absolute right-[-15px] text-red-500 text-4xl ml-4 top-[-15px]  cursor-pointer  "> <IoIosCloseCircle />
                </div>
              <h1 className="text-3xl font-bold text-gray-800">Immortaliser vos vacances</h1>  
              <p className="text-sm text-gray-500 mt-1">Ajoutez le lieu et quelques photos souvenir 🌴</p>
            </div>
      
            <div className="mb-4">
              <input value={inputs.cityName}  onChange={(e) => setInputs({...inputs , cityName : e.target.value})}
                placeholder="Entrez le lieu"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
            
              />
            </div>
      
            <div className="mb-4">
              <textarea  value={inputs.experience} onChange={(e) => setInputs({...inputs , experience : e.target.value})}
                placeholder="Décrivez vos vacances"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
              
              ></textarea>
            </div>
      
            <div className="mb-2 relative">
              <label className="flex flex-col items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md cursor-pointer hover:bg-blue-600 transition duration-300">
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4" />
                </svg>
                <span className="text-sm font-medium">Choisir des photos</span>
                <input 
                  onChange={handleImageChange}
                  accept="image/*"
                  multiple
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
      
                
            <div className="flex justify-center mt-3 relative overflow-auto max-w-full">
              {uploading ? (
                <p>Uploading...</p>
              ) : (
                pictures.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {pictures.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-20 h-20 object-cover border rounded"
                      />
                    ))}
                  </div>
                )
              )}
            </div>
      
            <div className="mt-4 relative flex justify-center">
            <button onClick={handleAdd} disabled={uploading} 
            className={`bg-blue-500 text-white cursor-pointer px-4 py-2 rounded-md transition  ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} `}> 
                        {uploading ? 'Patientez' : 'Ajouter'}   </button>
           
            </div>
          </div>
        </div>
      )}

  {/* Section des vacances */}
     <div>
                <h2 className="text-lg font-bold">Vos Vacances</h2>
         {loading ? (

              <div  className="flex justify-center  mt-5">
                  <div className="flex gap-3 ">                       
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <div role="status">
                            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>

                 </div>
              </div>
                  
         ) :  (
                <section className="w-full max-w-screen-lg mx-auto mt-5 px-4">
                      {vacances.length > 0 ? ( 


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">

                        {vacances.map((vac, index) => (
                          <div key={index} className="border-2 rounded-2xl p-3 flex flex-col items-center gap-2 w-full max-w-xs mx-auto"  >
                            <Slider images={vac?.images} />
                            <p className="font-semibold">{vac?.cityName}</p>
                            <button
                              onClick={() => handleShareTask(vac)}
                              className="bg-green-500 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-green-700 transition mt-2"
                            >
                              Partager sur WhatsApp
                            </button>
                          </div>
                        ))}
                            </div>
                        
                       ) : (<div className="border-2 w-full">
                                
                                <p></p>
                               

                 </div> )}
              
              </section>
           
         )}
     </div>


      


</div>

  );
};

export default Home; 