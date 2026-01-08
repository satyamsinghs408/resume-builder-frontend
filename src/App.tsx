

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ApiProvider } from "./context/ApiContext";
import Navbar from "./components/Navbar.jsx";

// Import the Guard
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // <--- IMPORT THIS

import Home from "./pages/Home.jsx";
import ResumeEditor from "./pages/ResumeEditor.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import "./App.css";

function App() {
  return (
    <ApiProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* --- PROTECT THIS ROUTE --- */}
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <ResumeEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* -------------------------- */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
