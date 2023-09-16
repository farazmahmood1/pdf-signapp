import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import Draggable from 'react-draggable';
import SignatureCanvas from 'react-signature-canvas';
import './styles.css'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer() {
    const [pdfFile, setPdfFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [signatureDataUrl, setSignatureDataUrl] = useState('');
    const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 100 });

    const signatureRef = useRef(null);

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

    const handleClear = () => {
        signatureRef.current.clear();
        setSignatureDataUrl('');
    };

    const handleGenerate = () => {
        const dataUrl = signatureRef.current.toDataURL('image/png', { transparent: true });
        setSignatureDataUrl(dataUrl);
    };

    const generateUpdatedPdf = async () => {
        try {
            if (!pdfFile) {
                alert('Please upload a PDF file.');
                return;
            }

            // Load the existing PDF
            const existingPdfBytes = await pdfFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Get the first page of the PDF
            const pages = pdfDoc.getPages();
            const page = pages[0]; // Assuming you're adding annotations to the first page

            // Add the signature image to the page
            if (signatureDataUrl) {
                const imageBytes = await fetch(signatureDataUrl).then((res) => res.arrayBuffer());
                const image = await pdfDoc.embedPng(imageBytes);
                const { width, height } = image.size();
                page.drawImage(image, {
                    x: signaturePosition.x,
                    y: page.getSize().height - signaturePosition.y - height, // Invert Y-axis
                    width,
                    height,
                });
            }

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

            <div>
                <div className="file-upload">
                    <button className="file-upload-btn" id="formFileLg" type="file" accept="application/pdf" onChange={onFileChange}>Add Image</button>
                    <div className="image-upload-wrap">
                        <input className="file-upload-input" type="file" onchange="readURL(this);" accept="image/*" />
                        <div className="drag-text">
                            <h3>Drag and drop a file or select add Image</h3>
                        </div>
                    </div>
                    <div className="file-upload-content">
                        <img className="file-upload-image" src="#" alt="your image" />
                        <div className="image-title-wrap">
                            <button type="button" onclick="removeUpload()" className="remove-image">Remove <span className="image-title">Uploaded Image</span></button>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div style={{ border: "2px solid black", width: 500, height: 200 }}>
                    <SignatureCanvas
                        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                        ref={signatureRef}
                    />
                </div>

                <br></br>
                <button style={{ height: "30px", width: "60px" }} onClick={handleClear}>Clear</button>
                <button style={{ height: "30px", width: "60px" }} onClick={handleGenerate}>Save</button>

                <br /><br />

                <Draggable
                    onDrag={(e, { x, y }) => setSignaturePosition({ x, y })}
                    position={signaturePosition}
                >
                    <img src={signatureDataUrl} alt="Signature" />
                </Draggable>
            </div>

            {pdfFile && (
                <div>
                    <Document
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1}>
                                {signatureDataUrl && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: signaturePosition.x,
                                            top: signaturePosition.y,
                                        }}
                                    >
                                        <img src={signatureDataUrl} alt="Signature" />
                                    </div>
                                )}
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
