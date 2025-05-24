// import { useState } from 'react';
// import axios from 'axios';
// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// const usePdf = () => {
//   const [loadingPdf, setLoadingPdf] = useState(false);
//   const [pdfName, setPdfName] = useState('');
//   const [pdfUrl, setPdfUrl] = useState(null);
//   const [text, setText] = useState('')

//   const generatePDF = async (text) => {
//     setLoadingPdf(true);

//     try {
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage([595.28, 841.89]);
//       const { height } = page.getSize();
//       const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//       const fontSize = 14;

//       let y = height - 50;
//       const lines = text.split('\n');

//       for (let line of lines) {
//         page.drawText(line, {
//           x: 50,
//           y,
//           size: fontSize,
//           font,
//           color: rgb(0, 0, 0),
//         });
//         y -= fontSize + 6;
//       }

//       const pdfBytes = await pdfDoc.save();
//       const blob = new Blob([pdfBytes], { type: 'application/pdf' });

//       const formData = new FormData();
//       formData.append('file', blob, `${pdfName || 'document'}.pdf`);
//       formData.append('upload_preset', 'auth_pdf');

//       // Très important : on utilise le bon endpoint pour fichiers PDF
//       const response = await axios.post('https://api.cloudinary.com/v1_1/dvnsrfsic/raw/upload', formData);

//       const uploadedUrl = response.data.secure_url;
//       setPdfUrl(uploadedUrl);
//       console.log('✅ PDF uploaded:', uploadedUrl);
//     } catch (error) {
//       console.error('❌ Erreur Cloudinary:', error);
//     }

//     setLoadingPdf(false);
//   };

//   const downloadPDF = () => {
//     if (!pdfUrl) return;
//     const link = document.createElement('a');
//     link.href = pdfUrl;
//     link.download = `${pdfName || 'document'}.pdf`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };


//   const savePdf = async() => {
//     try {
//         const res = await fetch('/api/saveNote' , {
//           method : "POST" , 
//           headers : {"Content-type" : "application/json"}, 
//           body : JSON.stringify({})
//         })
//     } catch (error) {
      
//     }
//   }

//   return {
//     pdfName,
//     setPdfName,
//     pdfUrl,
//     setPdfUrl,
//     loadingPdf,
//     generatePDF,
//     downloadPDF,
//   };
// };

// export default usePdf;


// // app/course/[id]/page.js
// 'use client';

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import toast from "react-hot-toast";
// import useNote from "../hooks/useNote";
// import usePdf from "../hooks/usePdf";
// import TextToPDF from "./PDF";

// const buttons = [
//   { id : 1 , name : "Note" , value: "note"} , 
//   { id : 2 , name : "Chapitres" , value: "chapter"} , 
//   { id : 3 , name : "Créer un pdf" , value: "pdf"} , 
// ]


// const CourseDetail = () => {
//   const [course , setCourse] = useState(null)
//   const [display , setDisplay] = useState('note')
//   const [btnColor , setBtnColor] = useState('note')
//   const [inputpdf, setInputPdf] = useState('')
//   const [displayInput, setDisplayInput] = useState(true) ; 
//   const [text, setText] = useState('');
//   // const [note , setNote] = useState('')

//   const {downloadPDF , generatePDF , loadingPdf , pdfName , setPdfName , pdfUrl , setPdfUrl} = usePdf() ; 
  
  
//   const handleAction = () => {
//     if (loadingPdf) return;

//     if (pdfUrl) {
//       downloadPDF();
//     } else {
//       if (!text.trim()) return alert("Le champ texte est vide !");
//       generatePDF(text);
//     }
//   };



//   ///   hook personalisé

//   const { loading , fetchNote  , handleSaveNote , note , setNote  } = useNote() ; 

 
//     const params = useParams() ; 
//     const {id}  = params
   
 
//     const fetchCourse = async() => {
//        try {
//          const res = await fetch(`/api/course/${id}`) ; 
//          const data = await res.json() ; 
//          if(!res.ok) throw new Error(data.message)
//          setCourse(data.courseById)
//        } catch (error) {
//          console.log("error getting the specifique course " , error.message)
//        }
//     }
 
//     useEffect(() => {
//          fetchCourse() ;  
//          fetchNote() ;  
//     }, [])
  
//     const handleDisplay = (value) => {
//           setDisplay(value)
//           setBtnColor(value)
//     }
    


//     // const handleSaveNote = async(e) => {
//     //    try {
//     //       e.preventDefault() ; 
//     //       const res = await fetch(`/api/course/${id}/note`, {
//     //           method : "POST" , 
//     //           headers : {"Content-type" : "application/json"} ,
//     //           body : JSON.stringify({note})
//     //       } )
//     //       const data = await res.json() ; 
//     //       if(!res.ok){
//     //         throw new Error(data.error) ;  
//     //       }else{
//     //            toast.success("Note saved successfully") ; 
//     //         }
//     //    } catch (error) {
//     //        console.log(error.message) ; 
//     //        toast.error(error.message) ; 
//     //    }
//     // }
//     // const fetchNote = async() => {
//     //     try {
//     //       const res = await fetch(`/api/course/${id}/note`) ; 
//     //       const data = await res.json()
//     //       if(!res.ok){
//     //          throw new Error(data.error) ; 
//     //       }else{
//     //         setNote(data.noteSpecific.note) ; 
//     //       }
//     //     } catch (error) {
//     //        console.log("Error getting data", error.message) ; 
//     //     }
//     // }
    

//   return (
//        <div>

//           {loading ? (
//            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
//            <div role="status" className="w-full max-w-md animate-pulse px-4">
//              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-52 mb-5"></div>
//              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px] mb-3"></div>
//              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-3"></div>
//              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[340px] mb-3"></div>
//              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[320px] mb-3"></div>
//              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[380px]"></div>
//              <span className="sr-only">Loading...</span>
//            </div>
//          </div>
         
//           ) : (
//             <div>
//             {/* Header */}
//             <div className="mb-6">             
//                     <h1 className="font-bold md:text-3xl md:pl-4 pl-2 text-2xl font-serif"> {course?.title}  </h1>
//             </div>

//                {/* buttons */}
//             <div className="flex  items-center gap-5">
//              {buttons.map((btn) => (
//                <div  key={btn.id}>
//                    <button onClick={()=> handleDisplay(btn.value)} className= {` px-2 cursor-pointer border-2 rounded-sm p-1  ${btn.value== btnColor ? 'bg-gray-700 text-white border-transparent '  : ''}  `} > {btn.name} </button>
//                </div>
//              ))}
//             </div>
//             {/* texterea */}
//           {display === 'note' && (
//                <div className="mt-6">
              
//                <textarea  value={note} onChange={(e) =>setNote(e.target.value) } className=" w-full  h-96 bg-white  p-6 rounded-xl  "  placeholder="Entrer vos notes de cours"> 

//                </textarea>

//                   <div>
//                   <button onClick={handleSaveNote}  className="bg-blue-400 p-1 ml-2 rounded-sm w-20 text-white cursor-pointer "> Save</button> 
//                  <button className="bg-green-400  p-1 ml-2 rounded-sm w-24 text-white cursor-pointer ">Generer pdf</button>
//                  <button className="bg-slate-400  p-1 ml-2 rounded-sm w-32 text-white cursor-pointer ">Creer un pdf</button>

//                   </div>
//            </div>
//           )}
//           {display === 'chapter' && (
//            <div className="mt-6">
//                <h1>Hello Chapter</h1>
//            </div>
//           )}
//        </div>
//           )}

//           {display === 'pdf' && ( 
//              <div className="mt-6">
//               <TextToPDF  />
//           </div> )}


//           {/* {displayInput && (

//             <div className=" mt-10 w-[80%] mx-auto  flex justify-center items-center flex-col gap-3  ">
//                      <input value={pdfName} onChange={(e) => setPdfName(e.target.value)} type="text" className="border-2"  placeholder="Entrer le nom du pdf"  />
//                  <textarea className="w-full border-2 bg-white">

//                  </textarea>
//                  <button className="bg-slate-400  p-1 ml-2 rounded-sm w-32 text-white cursor-pointer ">Creer un pdf</button>
//             </div>
//           )}
//  */}


// <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
//       <h2>📝 Générateur & Upload PDF</h2>

//       <input
//         type="text"
//         placeholder="Nom du fichier"
//         value={pdfName}
//         onChange={(e) => setPdfName(e.target.value)}
//         style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
//       />

//       <textarea
//         placeholder="Écris ici le contenu de ton PDF..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         rows={10}
//         style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
//       />

//       <button onClick={handleAction} disabled={loadingPdf} style={{ padding: '10px 16px' }}>
//         {loadingPdf
//           ? 'Génération en cours...'
//           : pdfUrl
//           ? '📥 Télécharger le PDF'
//           : '➕ Générer et Uploader le PDF'}
//       </button>

//       {pdfUrl && (
//         <p style={{ marginTop: '1rem' }}>
//           ✅ PDF disponible ici :{' '}
//           <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
//             Voir PDF
//           </a>
//         </p>
//       )}
//     </div>

          

       

//        </div>
  
//   );
// };

// export default CourseDetail;
