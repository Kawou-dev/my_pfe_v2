// app/course/[id]/page.js
'use client';

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import useNote from "../hooks/useNote";
import usePdf from "../hooks/usePdf";
import TextToPDF from "./PDF";
import { FaRegFilePdf } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { ColumnsIcon } from "lucide-react";
import TiptapEditor from "./TiptapEditor";

const buttons = [
  { id : 1 , name : "Note" , value: "note"} , 
  { id : 2 , name : "Chapitres" , value: "chapter"} , 
  { id : 3 , name : "Créer un pdf" , value: "pdf"} , 
]


const CourseDetail = () => {
  const [course , setCourse] = useState(null)
  const [display , setDisplay] = useState('note')
  const [btnColor , setBtnColor] = useState('note')
  const [inputpdf, setInputPdf] = useState('')
  const [displayInput, setDisplayInput] = useState(true) ; 
  const [text, setText] = useState('');
  const menuRef = useRef(null);
  // const [note , setNote] = useState('')

  const {downloadPDF , generatePDF , loadingPdf , pdfName , setPdfName , pdfUrl , setPdfUrl , fetchPdf , savePdf , pdfs , loadingSave , deletePdf, completePdf} = usePdf() ; 
  
  
  const handleAction = () => {
    if (loadingPdf) return;
    if (pdfUrl) {
      downloadPDF();
    } else {
      if (!note.trim()) return alert("Le champ texte est vide !");
      generatePDF(note);
    }
  };

  const { loading , fetchNote  , handleSaveNote , note , setNote  } = useNote() ; 

 
    const params = useParams() ; 
    const {id}  = params
   
 
    const fetchCourse = async() => {
       try {
         const res = await fetch(`/api/course/${id}`) ; 
         const data = await res.json() ; 
         if(!res.ok) throw new Error(data.message)
         setCourse(data.courseById)
       } catch (error) {
         console.log("error getting the specifique course " , error.message)
       }
    }
 
    useEffect(() => {
         fetchCourse() ;  
         fetchNote() ;  
         fetchPdf() ; 
         const handleClickOutside = (e) => {
          if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActivePdfId(null);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []); 
    const handleDisplay = (value) => {
          setDisplay(value)
          setBtnColor(value)
    }
    

    const handlePdfPost = async() => {
       await savePdf() ; 
    }
    const handleDeletePdf = async(publicId) =>{
          await deletePdf(publicId) ; 
    }
    const handleCompletePdf = async(pdf) => {
            await  completePdf(pdf.courseId,pdf._id) ; 
    } 

    const  handleSharePdf = (pdf) => {
       console.log(pdf)
       const mess = `Nom: ${pdf.pdfName}\n Lien: ${pdf.pdfUrl}  ` ; 
       window.open(`https://wa.me/?text=${encodeURIComponent(mess)}`, "_blank");
    }
     const handleShareTask = ({ cityName, images }) => {
    const message = `Vacance à : *${cityName}*\n\n${images.map((url, i) => `*🖼️ Image ${i + 1}* : ${url}`).join("\n")}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };


  

    const [activePdfId, setActivePdfId] = useState(null);

    const handlePdfOptions = (id) => {
      setActivePdfId((prev) => (prev === id ? null : id)); 
    };

    
    

  return (
       <div className="mb-3 mx-auto w-[100%] ">

          {loading ? (
           <div className="flex justify-center items-center h-screen bg-gray-200 dark:bg-gray-900">
           <div role="status" className="w-full max-w-md animate-pulse px-4">
             <div className="h-3 bg-gray-50 rounded-full dark:bg-gray-700 w-52 mb-5"></div>
             <div className="h-2.5 bg-gray-50 rounded-full dark:bg-gray-700 max-w-[340px] mb-3"></div>
             <div className="h-2.5 bg-gray-50 rounded-full dark:bg-gray-700 mb-3"></div>
             <div className="h-2.5 bg-gray-50 rounded-full dark:bg-gray-700 max-w-[3700px] mb-3"></div>
             <div className="h-2.5 bg-gray-50 rounded-full dark:bg-gray-700 max-w-[370px] mb-3"></div>
             <div className="h-2.5 bg-gray-50 rounded-full dark:bg-gray-700 max-w-[400px]"></div>
             <span className="sr-only">Loading...</span>
           </div>
         </div>
         
          ) : (
            <div className="">
            {/* Header */}
            <div className="mb-3 ml-5 mt-4">             
                    <h1 className="font-bold md:text-3xl md:pl-4 pl-2 text-2xl font-serif"> {course?.title}  </h1>
            </div>

               {/* buttons */}
            <div className="flex  md:ml-16 ml-10 md:pl-2  items-center gap-5">
             {buttons.map((btn) => (
               <div  key={btn.id}>
                   <button onClick={()=> handleDisplay(btn.value)} className= {` px-2 cursor-pointer border-2 rounded-sm p-1  ${btn.value== btnColor ? 'bg-gray-700 text-white border-transparent '  : ''}  `} > {btn.name} </button>
               </div>
             ))}
             
            </div>

            {/* <hr className="w-full mt-3 border-2" /> */}
             

     

          <div className="mx-auto  ">
          {display === 'note' && (
          <div className="mt-3 w-[95%] mx-auto   ">


              <div className="px-5  ">
                {/* Texte editor */}
            <div>
            <TiptapEditor note={note} setNote={setNote} />
            </div>

                {/* button save  and add pdf */}
          <div className="flex justify-between items-center  px-5 ">
                  {/* button save */}
                <div>
                    <button onClick={handleSaveNote} className="bg-blue-400 p-1 ml-2 rounded-sm w-24 text-white cursor-pointer">
                      Sauvegarder
                    </button>
                </div>

                  {/* download pdf */}
                <div>
                  {pdfUrl && (
                  <p style={{ marginTop: '1rem' }}>
                    ✅ PDF disponible ici :{' '}
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                      Voir PDF
                    </a>
                  </p>
                )}
                </div>
                {/* add pdf */}
            <div className="flex md:flex-row flex-col gap-0.5">
              <input
                type="text"
                placeholder="Nom du pdf"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
                className="bg-white w-28 border-2 border-green-300 outline-none rounded-sm pl-2 p-1"
              />
              <button
                onClick={handleAction}
                disabled={loadingPdf}
                className="bg-green-400 p-1 ml-2 rounded-sm text-white cursor-pointer"
              >
                {loadingPdf
                  ? 'Génération en cours...'
                  : pdfUrl
                  ? 'Télécharger le PDF'
                  : 'Générer pfd'}
              </button>
              <button onClick={handlePdfPost} className="bg-blue-500 ml-2 text-white p-1 rounded-sm">
                Ajouter pdf
              </button>
            </div>
          </div>

          </div>




         </div>



)}
            </div>

          {/* chapter pdf */}
          {display === 'chapter' && (
           <div className="mt-6">
               
               <div className="flex flex-col gap-3 w-[90%] mx-auto">
      <h1 className="text-xl font-semibold mt-3">Chapitres de ce cours</h1>

      <ul>
        {loadingSave ? (
          <p>Chargement des pdf...</p>
        ) : pdfs.length > 0 ? (
          pdfs.map((pdf, index) => (
            <li key={index} className="relative">
              <div className="flex justify-between items-center mt-2 w-full h-16 rounded-xl border-2 border-gray-400 px-4">
                <div className="flex items-center gap-2">
                  <FaRegFilePdf />
                  <Link
                    className="hover:underline text-blue-500 font-serif"
                    href={pdf?.pdfUrl}
                  >
                    {pdf?.pdfName}
                  </Link>
                </div>

                <div className="relative" ref={activePdfId === pdf._id ? menuRef : null}>
                  <div onClick={() => handlePdfOptions(pdf._id)} className="cursor-pointer">
                    <CiMenuKebab />
                  </div>

                  {activePdfId === pdf._id && (
                    <div className="absolute right-4 top-0 w-28 rounded-sm h-24 bg-white  shadow-lg z-10 p-2 text-black">
                       <div className="flex flex-col gap-1">
                       <p  onClick={() => handleCompletePdf(pdf)}  className="bg-green-500 pl-2 rounded cursor-pointer">Terminé</p>
                        <p onClick={() => handleSharePdf(pdf)} className="bg-blue-500 pl-2 rounded cursor-pointer"> Envoyer </p>
                       <p onClick={() => handleDeletePdf(pdf.publicId)} className="bg-red-400 pl-2 rounded text-black cursor-pointer">Suprimer</p>
                       </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Vous avez aucun pdf pour ce cours</p>
        )}
      </ul>
    </div>
            
           </div>
          )}
       </div>
          )}
             
             {/* make pdf */}
          {display === 'pdf' && ( 
             <div className="mt-6">
              <TextToPDF  />
          </div> )}          

         

    








       </div>

      
  );
};

export default CourseDetail;
  {/* <button className="bg-green-400  p-1 ml-2 rounded-sm w-24 text-white cursor-pointer ">Generer pdf</button> */}
                 {/* <button className="bg-slate-400  p-1 ml-2 rounded-sm w-32 text-white cursor-pointer ">Creer un pdf</button> */}
                 {/* <button onClick={handleAction} disabled={loadingPdf} className="bg-green-400  p-1 ml-2 rounded-sm  text-white cursor-pointer ">
                        {loadingPdf
                          ? 'Génération en cours...'
                          : pdfUrl
                          ? '📥 Télécharger le PDF'
                          : '➕ Générer et Uploader le PDF'}
               </button> */}

        //        <div className="flex  flex-col gap-3 w-[90%] mx-auto">   
        //        <h1 className="text-xl font-semibold mt-3">Chapitres de ce cours</h1>    
                   
        //              <ul>
        //            {loadingSave ? (
        //              <p>Chargement des pdf...</p>
        //            ) : (
        //               pdfs.length > 1 ? (
        //                pdfs.map((pdf, index) => (
        //                  <div key={index} className=" flex justify-between items-center mt-2  w-full h-16 rounded-xl border-2 border-gray-400 px-4 ">
        //                    {/* pdf link */}
        //                    <div className="flex items-center gap-2 ">
        //                    <FaRegFilePdf />
        //                    <Link className="hover:underline text-blue-500 font-serif "  href={pdf?.pdfUrl}><li >{pdf?.pdfName}</li></Link>
        //                    </div>

                           
                           
                               
        //                      {/* kebab button */}
                         
        //                        <div className="w-28 h-20 top-0  absolute bg-red-400 right-2  ">
        //                        </div>
        //                        <div onClick={() => handlePdfOptions(pdf._id)}  className="cursor-pointer">
                                   
        //                            <CiMenuKebab />
        //                            </div>
                          
        //                  </div>
        //                ))
        //               ) : (
        //                   <p>Vous avez aucun pdf pour ce cours</p>
        //               )
        //            )}
        //          </ul>
                
        // </div>