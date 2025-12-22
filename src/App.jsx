import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Home from './pages/Home.jsx';
import ResumeEditor from './pages/ResumeEditor';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<ResumeEditor />} />
      </Routes>
    </Router>
  );
}

export default App;