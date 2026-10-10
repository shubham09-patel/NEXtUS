import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Rocket, Moon, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is Auth page (/login or /register)
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isAuthPage ? "w-[90%] max-w-xl" : "w-[92%] max-w-5xl"
      }`}
    >
      <div className="bg-[#0e0e12]/80 backdrop-blur-xl border border-zinc-800/80 rounded-full px-5 py-2.5 flex items-center justify-between shadow-2xl">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-white-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition">
            <Rocket className="w-4 h-4 fill-white" />
          </div>
          <span className="font-bold text-white text-base tracking-tight">
            NEXT<span className="text-blue-400">us</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="flex items-center gap-1 bg-zinc-900/60 p-1 rounded-full border border-zinc-800/50 text-xs font-medium">
          <Link 
            to="/" 
            className={`px-3.5 py-1.5 rounded-full transition ${
              location.pathname === "/" 
                ? "bg-blue-600 text-white shadow-md shadow-indigo-600/30 font-semibold" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          <a href="/#features" className="px-3.5 py-1.5 text-zinc-400 hover:text-white transition">
            Features
          </a>
          <a href="/#contact" className="px-3.5 py-1.5 text-zinc-400 hover:text-white transition">
            Contact
          </a>
        </div>

        {/* Right Actions - Conditional rendering for Auth Pages */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="p-1.5 text-zinc-400 hover:text-white transition rounded-full hover:bg-zinc-800/50">
            <Moon className="w-4 h-4" />
          </button>

          {!isAuthPage && (
            <>
              <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block"></div>

              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-blue-600 text-white shadow-md shadow-indigo-600/30 hover:bg-blue-500 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-zinc-400 hover:text-red-400 transition"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg shadow-indigo-600/40 hover:opacity-90 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </motion.nav>
  );
}