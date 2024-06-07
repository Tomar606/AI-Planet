import React, { useState } from 'react';
import logoai from '../assets/logoai.png';
import axios from 'axios';

const Navbar = () => {
  const [pdfName, setPdfName] = useState(localStorage.getItem('pdfName') || '');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfName(file.name);
      localStorage.setItem('pdfName', file.name); // Store file name in local storage

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('https://ai-planet-kuz9.onrender.com/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          console.log('File uploaded successfully');
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logoai} alt="AI Planet Logo" className="h-10 w-24" />
      </div>
      <div className='flex items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-4 text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
        {pdfName && <span className="mr-8 text-green-500 hidden md:inline">{pdfName}</span>}
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" className="mr-4 p-2 bg-white border-black border-2 text-black rounded-lg flex items-center cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="hidden md:inline">Upload PDF</span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
