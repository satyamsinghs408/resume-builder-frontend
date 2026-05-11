import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AdSlot from './ads/AdSlot';

const Footer: React.FC = () => {
  const location = useLocation();
  const isEditorPage = location.pathname === '/editor';

  // Do not show footer on the editor page
  if (isEditorPage) return null;

  return (
    <>
      {/* Ad Placeholder Before Footer */}
      <div
        className="w-full bg-slate-900 border-t border-slate-800 pt-6 sm:pt-8 relative z-20"
        aria-label="Bottom Advertisement"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot
            position="footer"
            className="bg-slate-800/80 border-slate-700 text-slate-400"
          />
        </div>
      </div>

      {/* FOOTER */}
      <footer
        className="bg-slate-900 text-slate-400 py-12 sm:py-16 border-t border-slate-800"
        aria-label="Site Footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-10 sm:mb-16">
            {/* Column 1 */}
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2 mb-4 sm:mb-6 group"
              >
                <img
                  src="/logo.png"
                  alt="CareerLeaf"
                  className="h-10 w-auto object-contain bg-white rounded-lg px-2 py-1 shadow-sm"
                />
              </Link>
              <p className="text-sm mb-2 text-slate-400 bg-slate-800/50 p-4 rounded-xl border border-slate-800 leading-relaxed font-medium">
                The simplest free online resume builder and CV maker designed
                for modern professionals.
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
                Resume
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-sm font-medium">
                <li>
                  <Link
                    to="/editor"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Resume Builder
                  </Link>
                </li>
                <li>
                  <Link
                    to="/templates"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Templates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/examples"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Examples
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Career Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-sm font-medium">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-of-service"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/feedback"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    className="hover:text-emerald-400 text-slate-400 transition-colors flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3" /> Disclaimer
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-white font-bold mb-4 sm:mb-6 text-sm sm:text-base uppercase tracking-wider">
                Connect
              </h3>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-600/20 hover:text-emerald-400 flex items-center justify-center text-slate-400 transition-all shadow-sm"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-600/20 hover:text-indigo-400 flex items-center justify-center text-slate-400 transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-400 hover:bg-slate-700/20 hover:text-white flex items-center justify-center text-slate-400 transition-all shadow-sm"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-slate-800 text-center text-xs sm:text-sm text-slate-500 font-medium">
            © {new Date().getFullYear()} CareerLeaf.app. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
