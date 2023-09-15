import React from 'react'
import './navbarStyles.css'

const Navbar = () => {
    return (
        <div>



            <nav className="navbar navbar-expand-lg bg-light p-0" style={{backgroundColor:"#fff"}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">LOGO</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link navbar-crumbs" aria-current="page" href="#">Merge PDF</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navbar-crumbs" aria-current="page" href="#">SPLIT PDF</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link navbar-crumbs" aria-current="page" href="#">COMPRESS PDF</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle navbar-crumbs" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    CONVERT PDF
                                </a>
                                <ul className="dropdown-menu border border-top border-danger border-bottom-0 border-end-0 border-start-0 border-5" aria-labelledby="navbarDropdown" style={{width:"600px"}}>
                                    <li>
                                        <div className='row'>
                                            <div className='col-lg-6 mt-3'>
                                                <h5>Convert To PDF</h5>
                                                <div>
                                                    <p>JPG to PDF</p>
                                                </div>
                                                <div>
                                                    <p>Word to PDF</p>
                                                </div>
                                                <div>
                                                    <p>PowerPoint to PDF</p>
                                                </div>
                                                <div>
                                                    <p>Excel to PDF</p>
                                                </div>
                                                <div>
                                                    <p>HTML to PDF</p>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 mt-3'>
                                                <h5>Convert To PDF</h5>
                                                <div>
                                                    <p>JPG to PDF</p>
                                                </div>
                                                <div>
                                                    <p>Word to PDF</p>
                                                </div>
                                                <div>
                                                    <p>PowerPoint to PDF</p>
                                                </div>
                                                <div>
                                                    <p>Excel to PDF</p>
                                                </div>
                                                <div>
                                                    <p>HTML to PDF</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle navbar-crumbs" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    ALL PDF TOOLS
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>


                        </ul>

                        <ul className="navbar-nav ms-auto">

                            <li>
                                <a style={{ height: "60px" }} className="navbar-brand navbar-auth-in d-flex align-items-center px-2 me-0">
                                    <p className='auth-text'>Login In</p>
                                </a>
                            </li>

                            <li>
                                <a style={{ height: "60px" }} className="navbar-brand navbar-auth d-flex align-items-center px-2">
                                    <p className='auth-text'>Sign Up</p>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>



        </div>
    )
}

export default Navbar









// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Configure the worker for PDF.js
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// function PdfViewer() {
//     const [pdfFile, setPdfFile] = useState(null);
//     const [numPages, setNumPages] = useState(null);

//     const onFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file && file.type === 'application/pdf') {
//             setPdfFile(file);
//         } else {
//             alert('Please select a valid PDF file.');
//         }
//     };

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     return (
//         <div>
//             <div>
//                 <label htmlFor="formFileLg" className="form-label">Upload a PDF file</label>
//                 <input className="form-control form-control-lg" id="formFileLg" type="file" accept="application/pdf" onChange={onFileChange} />
//             </div>
//             {pdfFile && (
//                 <div>
//                     <Document
//                         file={pdfFile}
//                         onLoadSuccess={onDocumentLoadSuccess}
//                     >
//                         {Array.from(new Array(numPages), (el, index) => (
//                             <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                         ))}
//                     </Document>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default PdfViewer;
