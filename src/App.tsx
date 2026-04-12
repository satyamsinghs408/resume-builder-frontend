import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ApiProvider } from "./context/ApiContext";
import { EditorProvider } from "./context/EditorContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
import FeedbackPage from "./pages/FeedbackPage";
import ProfilePage from "./pages/ProfilePage";

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
              <Route path="/feedback" element={<FeedbackPage />} />

              {/* --- editor is now public for guest creation --- */}
              <Route path="/editor" element={<ResumeEditor />} />
              
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              {/* -------------------------- */}

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </Router>
        </EditorProvider>
      </AuthProvider>
    </ApiProvider>
  );
}

export default App;
