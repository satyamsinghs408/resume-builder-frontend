import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import SEO from "../components/SEO";

const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="Page Not Found | CareerLeaf"
        description="The page you're looking for doesn't exist or has been moved."
        path="/404"
        noindex={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-lg"
        >
          {/* Large 404 */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 120 }}
            className="mb-6"
          >
            <span className="text-[10rem] sm:text-[12rem] font-black leading-none bg-gradient-to-br from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent select-none">
              404
            </span>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-base sm:text-lg mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-indigo-600/25"
            >
              <Home size={18} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold rounded-xl transition-colors duration-200 border border-white/10"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;
