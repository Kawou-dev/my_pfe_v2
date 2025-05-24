import React from 'react'
import NavBar from '../portfolio/NavBar'
import Footer from './Footer'

const Author = () => {
  return (
    <div className=' w-[70%] mx-auto my-10  '>

           <div className='flex flex-col gap-5 justify-center'>
              <div className="p-5 border shadow-md rounded text-gray-500">
            <div className="flex items-center">
                <img className="w-20 h-20 shadow-md rounded-full mr-3" src="/images/bhoye.jpg" alt="jane" />
                <div className="text-sm">
                    <a href="#"
                        className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
                       Balde Mamadou Bhoye
                    </a>
                    <p>Etudiant en Informatique</p>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-900">
    Je développe mes compétences en informatique avec l’objectif de résoudre des problèmes réels et d’avoir un impact positif dans le secteur technologique.
                </p>

             </div>
                 <div className="p-5 border shadow-md rounded text-gray-500">
            <div className="flex items-center">
                <img className="w-20 h-20 rounded-full shadow-md mr-3" src="/images/admin_photo.png" alt="jane" />
                <div className="text-sm">
                    <a href="#"
                        className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
                        Bah Mamadou Oury
                    </a>
                    <p>Etudiant en Informatique</p>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-900">
              Curieux et passionné d’informatique, je cherche constamment à apprendre pour développer des solutions utiles et durables dans ce secteur en pleine évolution.
            </p>

             </div>

           </div>
    </div>

    // <div>
    //         {/* 1 */}

    //         <div>
              
    //         </div>





    // </div>
  )
}

export default Author
