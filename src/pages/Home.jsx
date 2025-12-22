import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Ultimate Resume Builder</h1>
      <p>Build professional resumes in minutes with MERN Stack.</p>
      
      <Link to="/editor">
        <button style={{ padding: '15px 30px', fontSize: '18px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer' }}>
          Create My Resume
        </button>
      </Link>
    </div>
  );
};

export default Home;