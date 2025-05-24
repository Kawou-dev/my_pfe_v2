"use client"
import { useState } from 'react';
import axios from 'axios';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

const usePdf = () => {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfName, setPdfName] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [publicId , setPublicId] = useState(null) ; 
  const [loadingSave, setLoadingSave] = useState(false)
  const [pdfs, setPdfs] = useState([]) ; 

  const params = useParams() ; 
    const {id}  = params ; 
  

  // const generatePDF = async (text) => {
  //   setLoadingPdf(true);

  //   try {
  //     const pdfDoc = await PDFDocument.create();
  //     const page = pdfDoc.addPage([595.28, 841.89]);
  //     const { height } = page.getSize();
  //     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  //     const fontSize = 14;

  //     let y = height - 50;
  //     const lines = text.split('\n');

  //     for (let line of lines) {
  //       page.drawText(line, {
  //         x: 50,
  //         y,
  //         size: fontSize,
  //         font,
  //         color: rgb(0, 0, 0),
  //       });
  //       y -= fontSize + 6;
  //     }

  //     const pdfBytes = await pdfDoc.save();
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });

  //     const formData = new FormData();
  //     formData.append('file', blob, `${pdfName || 'document'}.pdf`);
  //     formData.append('upload_preset', 'auth_pdf');

  //     // Très important : on utilise le bon endpoint pour fichiers PDF
  //     const response = await axios.post('https://api.cloudinary.com/v1_1/dvnsrfsic/raw/upload', formData);

  //     // const uploadedUrl = response.data.secure_url;
  //     // setPdfUrl(uploadedUrl);
  //     const { secure_url, public_id } = response.data;
  //     setPdfUrl(secure_url);
  //     setPublicId(public_id) ; 
  //    // console.log(' PDF uploaded:', uploadedUrl);
  //   } catch (error) {
  //     console.error(' Erreur Cloudinary:', error);
  //   }

  //   setLoadingPdf(false);
  // };

  // const generatePDF = async (text) => {
  //   setLoadingPdf(true);
  
  //   try {
  //     const pdfDoc = await PDFDocument.create();
  //     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  //     const fontSize = 14;
  //     const pageWidth = 595.28;
  //     const pageHeight = 841.89;
  //     const margin = 50;
  //     let y = pageHeight - margin;
  
  //     let page = pdfDoc.addPage([pageWidth, pageHeight]);
  //     const lines = text.split('\n');
  
  //     for (let line of lines) {
  //       const words = line.split(' ');
  //       let currentLine = '';
  
  //       for (let word of words) {
  //         const testLine = currentLine + word + ' ';
  //         const textWidth = font.widthOfTextAtSize(testLine, fontSize);
  
  //         if (textWidth + margin > pageWidth - margin) {
  //           // Si ligne trop longue, on l’écrit et on passe à la suivante
  //           page.drawText(currentLine, {
  //             x: margin,
  //             y,
  //             size: fontSize,
  //             font,
  //             color: rgb(0, 0, 0),
  //           });
  //           y -= fontSize + 6;
  //           currentLine = word + ' ';
  
  //           // Saut de page si nécessaire
  //           if (y < margin) {
  //             page = pdfDoc.addPage([pageWidth, pageHeight]);
  //             y = pageHeight - margin;
  //           }
  //         } else {
  //           currentLine = testLine;
  //         }
  //       }
  
  //       if (currentLine.trim() !== '') {
  //         page.drawText(currentLine, {
  //           x: margin,
  //           y,
  //           size: fontSize,
  //           font,
  //           color: rgb(0, 0, 0),
  //         });
  //         y -= fontSize + 6;
  
  //         if (y < margin) {
  //           page = pdfDoc.addPage([pageWidth, pageHeight]);
  //           y = pageHeight - margin;
  //         }
  //       }
  //     }
  
  //     const pdfBytes = await pdfDoc.save();
  //     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
  //     const formData = new FormData();
  //     formData.append('file', blob, `${pdfName || 'document'}.pdf`);
  //     formData.append('upload_preset', 'auth_pdf');
  
  //     const response = await axios.post(
  //       'https://api.cloudinary.com/v1_1/dvnsrfsic/raw/upload',
  //       formData
  //     );
  
  //     const { secure_url, public_id } = response.data;
  //     setPdfUrl(secure_url);
  //     setPublicId(public_id);
  //   } catch (error) {
  //     console.error(' Erreur Cloudinary:', error);
  //   }
  
  //   setLoadingPdf(false);
  // };
  
  const generatePDF = async (html) => {
  setLoadingPdf(true);

  try {
    const pdfDoc = await PDFDocument.create();
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 14;
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const margin = 50;
    let y = pageHeight - margin;

    let page = pdfDoc.addPage([pageWidth, pageHeight]);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;

    const walk = (node) => {
      if (y < margin) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) {
          const font = boldAncestor(node) ? boldFont : regularFont;
          page.drawText(text, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          });
          y -= fontSize + 6;
        }
      } else if (node.nodeName === 'BR') {
        y -= fontSize + 6;
      } else if (node.nodeName === 'P') {
        Array.from(node.childNodes).forEach(walk);
        y -= fontSize + 10;
      } else {
        Array.from(node.childNodes).forEach(walk);
      }
    };

    const boldAncestor = (node) => {
      while (node) {
        if (
          node.nodeName === 'STRONG' ||
          node.nodeName === 'B'
        ) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    };

    Array.from(body.childNodes).forEach(walk);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const formData = new FormData();
    formData.append('file', blob, `${pdfName || 'document'}.pdf`);
    formData.append('upload_preset', 'auth_pdf');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dvnsrfsic/raw/upload',
      formData
    );

    const { secure_url, public_id } = response.data;
    setPdfUrl(secure_url);
    setPublicId(public_id);
  } catch (error) {
    console.error('Erreur Cloudinary:', error);
  }

  setLoadingPdf(false);
};


  const downloadPDF = () => {
    if (!pdfUrl) return;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${pdfName || 'document'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchPdf = async() => {
    setLoadingSave(true)
    try {
      const res = await fetch(`/api/course/${id}/pdf`) ; 
      const data = await res.json()
      if(!res.ok){
         throw new Error(data.error) ; 
      }else{
        setPdfs(data.pdf) ;
        
 
      }
    } catch (error) {
       console.log("Error getting pdfs", error.message) ; 
    }finally{
      setLoadingSave(false) ; 
    }
}


  const savePdf = async() => {
    setLoadingSave(true)
           try {
              const res = await fetch(`/api/course/${id}/pdf`, {
                  method : "POST" , 
                  headers : {"Content-type" : "application/json"} ,
                  body : JSON.stringify({pdfName, pdfUrl , publicId})
              } )
              const data = await res.json() ; 
              if(!res.ok){
                throw new Error(data.error) ;  
              }else{
                   toast.success("pdf ajouté avec succès") ; 
                   fetchPdf() ; 
                }
           } catch (error) {
               console.log(error.message) ; 
               toast.error(error.message) ; 
           }finally{
            setLoadingSave(false) ; 
           }
        }

        const deletePdf = async (publicId) => {
          setLoadingPdf(true);
          try {
            const res = await fetch('/api/cloudinary', {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ publicId })
            });
        
            const data = await res.json();
        
            if (!res.ok) {
              throw new Error(data.message);
            } else {
              toast.success("pdf supprimé avec succès");
              fetchPdf();
            }
          } catch (error) {
            console.error(error.message);
            toast.error(error.message);
          } finally {
            setLoadingPdf(false);
          }
        }



        const completePdf = async(courseId , id) => {
              setLoadingPdf(true)
              try {
                 const res = await fetch(`/api/course/${id}/pdf`, {
                    method : "PUT" , 
                    headers : {"Content-type": "application/json"} , 
                    body : JSON.stringify({courseId  , id })
                 })
                 if(!res.ok) throw new Error(res.error) ; 
                 toast.success("Hello Kawou") ;

              } catch (error) {
                toast.error(error.message)  ; 
                console.log(error.message)
              }
        }
        

  return {
    pdfName,
    setPdfName,
    pdfUrl,
    setPdfUrl,
    loadingPdf,
    generatePDF,
    downloadPDF,
    savePdf , 
    fetchPdf , 
    pdfs, 
    loadingSave , 
    deletePdf , 
    completePdf
  };
};

export default usePdf;
