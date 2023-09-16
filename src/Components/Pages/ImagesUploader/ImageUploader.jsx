

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument, rgb } from 'pdf-lib';
// import { PDFDocument, rgb } from 'pdf-lib/build/pdf-lib';



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer() {
    const [selectedAnnotation, setSelectedAnnotation] = useState(null);

    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [annotations, setAnnotations] = useState([
        {
            text: 'Sarib Bhai',
            x: 100, // Initial X position
            y: 100, // Initial Y position
        },
        // Add more annotations as needed
    ]);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handlePdfClick = (e) => {
        const clickedX = e.nativeEvent.offsetX;
        const clickedY = e.nativeEvent.offsetY;

        // Check if an annotation was clicked
        const clickedAnnotation = annotations.find((annotation) => {
            const { x, y, text } = annotation;
            const width = text.length * 10;
            const height = 20;

            return (
                clickedX >= x &&
                clickedX <= x + width &&
                clickedY >= y &&
                clickedY <= y + height
            );
        });

        if (clickedAnnotation) {
            // If an annotation was clicked, select it
            setSelectedAnnotation(clickedAnnotation);
        } else if (selectedAnnotation) {
            // If an annotation is selected, move it to the clicked position
            const updatedAnnotations = annotations.map((annotation) =>
                annotation === selectedAnnotation
                    ? { ...annotation, x: clickedX, y: clickedY }
                    : annotation
            );
            setAnnotations(updatedAnnotations);
            setSelectedAnnotation(null); // Deselect after moving
        }
    };


    // const generateUpdatedPdf = async () => {
    //     try {
    //         // Load the existing PDF
    //         const existingPdfBytes = await pdfFile.arrayBuffer();
    //         const pdfDoc = await PDFDocument.load(existingPdfBytes);

    //         // Get the first page of the PDF
    //         const pages = pdfDoc.getPages();
    //         const page = pages[0]; // Assuming you're adding annotations to the first page

    //         // Add text annotations
    //         annotations.forEach((annotation) => {
    //             const { x, y, text } = annotation;

    //             // Create a new text field
    //             const textWidth = text.length * 10; // Adjust this as needed
    //             const textHeight = 20; // Adjust this as needed
    //             const textAnnotation = page.drawText(text, {
    //                 x,
    //                 y: page.getHeight() - y - textHeight, // Invert Y-coordinate
    //                 size: 12,
    //                 color: rgb(0, 0, 0), // Black color
    //             });

    //             // Modify text appearance if needed
    //             // textAnnotation.setFontSize(12);

    //             // Add more styling options here if necessary

    //             // Add the text annotation to the page
    //             page.drawRectangle({
    //                 x,
    //                 y: page.getHeight() - y - textHeight,
    //                 width: textWidth,
    //                 height: textHeight, 
    //                 borderColor: rgb(0, 0, 0), // Black border
    //                 borderWidth: 1,
    //             });

    //             page.drawText(text, {
    //                 x,
    //                 y: page.getHeight() - y - textHeight + 5, // Adjust vertical position
    //                 size: 12,
    //                 color: rgb(0, 0, 0), // Black color
    //             });
    //         });

    //         // Serialize the modified PDF
    //         const modifiedPdfBytes = await pdfDoc.save();

    //         // Create a Blob from the PDF bytes
    //         const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

    //         // Create a download link and trigger the download
    //         const downloadLink = document.createElement('a');
    //         downloadLink.href = URL.createObjectURL(blob);
    //         downloadLink.download = 'updated_pdf.pdf';
    //         downloadLink.click();
    //     } catch (error) {
    //         console.error('Error generating updated PDF:', error);
    //     }
    // };



    const generateUpdatedPdf = async () => {
        try {
            // Load the existing PDF
            const existingPdfBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
    
            // Get the first page of the PDF
            const pages = pdfDoc.getPages();
            const page = pages[0]; // Assuming you're adding annotations to the first page
    
            // Specify the font for text annotations
            const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    
            // Add text annotations
            annotations.forEach((annotation) => {
                const { x, y, text } = annotation;
    
                // Create a new text field
                const textWidth = font.widthOfTextAtSize(text, 12); // Calculate text width
                const textHeight = 12; // Font size
                const textAnnotation = page.drawText(text, {
                    x,
                    y: page.getHeight() - y - textHeight, // Invert Y-coordinate
                    size: 12,
                    font,
                    color: rgb(0, 0, 0), // Black color
                });
    
                // Add the text annotation to the page
                page.drawRectangle({
                    x,
                    y: page.getHeight() - y - textHeight,
                    width: textWidth,
                    height: textHeight, 
                    borderColor: rgb(0, 0, 0), // Black border
                    borderWidth: 1,
                });
            });
    
            // Serialize the modified PDF
            const modifiedPdfBytes = await pdfDoc.save();
    
            // Create a Blob from the PDF bytes
            const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    
            // Create a download link and trigger the download
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = 'updated_pdf.pdf';
            downloadLink.click();
        } catch (error) {
            console.error('Error generating updated PDF:', error);
        }
    };
    
    return (
        <div className='container mt-5'>
            <div>
                <label htmlFor="formFileLg" className="form-label">Upload a PDF file</label>
                <input className="form-control form-control-lg" id="formFileLg" type="file" accept="application/pdf" onChange={onFileChange} />
            </div>
            {pdfFile && (
                <div>
                    <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onClick={handlePdfClick}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1}>
                                {annotations.map((annotation, i) => (
                                    <div
                                        key={`annotation_${i}`}
                                        style={{
                                            position: 'absolute',
                                            left: annotation.x,
                                            top: annotation.y,
                                            cursor: 'move',
                                            border: '1px solid #000',
                                        }}
                                        className={`homemade-font ${annotation === selectedAnnotation ? 'selected' : ''
                                            }`}
                                        onMouseDown={() => setSelectedAnnotation(annotation)}
                                    >
                                        {annotation.text}
                                    </div>
                                ))}
                            </Page>
                        ))}
                    </Document>
                </div>
            )}

            <button onClick={generateUpdatedPdf}>Download Updated PDF</button>

        </div>
    );
}

export default PdfViewer;
