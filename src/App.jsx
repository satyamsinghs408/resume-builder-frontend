import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// --- NEW IMPORTS FOR PDF ---
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// This registers the fonts so pdfmake can use them
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
} else if (pdfFonts && pdfFonts.vfs) {
  pdfMake.vfs = pdfFonts.vfs;
} else {
    // Fallback
    pdfMake.vfs = pdfFonts;
}// ---------------------------

function App() {
  const [resumeData, setResumeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const saveResume = async () => {
    try {
      await axios.post('http://localhost:5000/api/resumes', resumeData);
      alert('Resume saved to Cloud successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Failed to save.');
    }
  };

  // --- NEW FUNCTION: GENERATE PDF ---
  const generatePDF = () => {
    // 1. Define the document structure
    var docDefinition = {
      content: [
        // Header (Name)
        { 
          text: `${resumeData.firstName} ${resumeData.lastName}`, 
          style: 'header' 
        },
        
        // Contact Info
        {
          text: `Email: ${resumeData.email} | Phone: ${resumeData.phone}`,
          alignment: 'center',
          margin: [0, 0, 0, 20] // Left, Top, Right, Bottom
        },

        // Address Line
        { 
          text: resumeData.address ? `Address: ${resumeData.address}` : '',
          style: 'subheader'
        },

        // Divider Line
        { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 515, y2: 5, lineWidth: 1 }] },
        
        // You can add more sections here later (Experience, Education)
      ],

      // 2. Define Styles
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 12,
          margin: [0, 10, 0, 5]
        }
      }
    };

    // 3. Create and Download
    pdfMake.createPdf(docDefinition).download('My_Resume.pdf');
  };
  // --------------------------------

  return (
    <div className="App" style={{ padding: '20px', display: 'flex', gap: '20px' }}>
      
      {/* LEFT SIDE: Form */}
      <div className="form-section" style={{ flex: 1, borderRight: '2px solid #333' }}>
        <h2>Enter Details</h2>
        <form onSubmit={(e) => { e.preventDefault(); saveResume(); }}>
          <div>
            <input name="firstName" placeholder="First Name" value={resumeData.firstName} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '8px' }} />
          </div>
          <div>
            <input name="lastName" placeholder="Last Name" value={resumeData.lastName} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '8px' }} />
          </div>
          <div>
            <input name="email" placeholder="Email" value={resumeData.email} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '8px' }} />
          </div>
           <div>
            <input name="phone" placeholder="Phone" value={resumeData.phone} onChange={handleChange} style={{ display: 'block', margin: '10px 0', padding: '8px' }} />
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <button type="submit" style={{ padding: '10px 20px', background: 'green', color: 'white', marginRight: '10px' }}>
              Save to Cloud
            </button>

            {/* --- NEW BUTTON --- */}
            <button 
              type="button" 
              onClick={generatePDF}
              style={{ padding: '10px 20px', background: 'blue', color: 'white' }}
            >
              Download PDF
            </button>
            {/* ------------------ */}
          </div>

        </form>
      </div>

      {/* RIGHT SIDE: Preview */}
      <div className="preview-section" style={{ flex: 1, background: '#f0f0f0', padding: '20px' }}>
        <h2>Live Preview</h2>
        <div style={{ background: 'white', padding: '20px', minHeight: '500px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{textAlign: 'center'}}>{resumeData.firstName} {resumeData.lastName}</h1>
          <p style={{textAlign: 'center'}}>
            {resumeData.email} {resumeData.phone ? `| ${resumeData.phone}` : ''}
          </p>
          <hr />
          {/* Visual representation of what the PDF will somewhat look like */}
        </div>
      </div>

    </div>
  );
}

export default App;