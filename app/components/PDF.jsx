'use client';
import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default function TextToPDF() {
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 14;
      const pageWidth = 595.28;
      const pageHeight = 841.89;
      const margin = 50;
      let y = pageHeight - margin;

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      const lines = text.split('\n');

      for (let line of lines) {
        const words = line.split(' ');
        let currentLine = '';

        for (let word of words) {
          const testLine = currentLine + word + ' ';
          const textWidth = font.widthOfTextAtSize(testLine, fontSize);

          if (textWidth + margin > pageWidth - margin) {
            page.drawText(currentLine, {
              x: margin,
              y,
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            });
            y -= fontSize + 6;
            currentLine = word + ' ';

            if (y < margin) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - margin;
            }
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine.trim() !== '') {
          page.drawText(currentLine, {
            x: margin,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0),
          });
          y -= fontSize + 6;

          if (y < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url); 
    } catch (error) {
      console.error('Erreur lors de la génération du PDF :', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.pdf';
    link.click();
  };

  return (
    <div className="mx-auto p-4">
      <textarea
        className="bg-white rounded-xl w-full p-2 h-32"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setPdfUrl(null); // Réinitialiser le lien si texte modifié
        }}
        placeholder="Entrer votre texte"
      />
      <br />
      <button
        className="bg-blue-600 p-1 px-3 text-white cursor-pointer rounded-sm mt-2"
        onClick={pdfUrl ? downloadPDF : generatePDF}
        disabled={loading}
      >
        {loading
          ? 'Génération...'
          : pdfUrl
          ? 'Télécharger PDF'
          : 'Générer PDF'}
      </button>
    </div>
  );
}
