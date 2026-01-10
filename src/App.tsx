

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ApiProvider } from "./context/ApiContext";
import { EditorProvider } from "./context/EditorContext";
import Header from "./components/Header";

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
        <EditorProvider>
          <Router>
            <Header />
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
        </EditorProvider>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
