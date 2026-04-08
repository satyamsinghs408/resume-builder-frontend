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

// Import SEO / Legal Pages
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import TemplatesPage from "./pages/TemplatesPage";
import ExamplesPage from "./pages/ExamplesPage";
import CoverLetterPage from "./pages/CoverLetterPage";

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

              {/* Public Sub-Pages (SEO & AdSense Required) */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/examples" element={<ExamplesPage />} />
              <Route path="/cover-letter" element={<CoverLetterPage />} />

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
