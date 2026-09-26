import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Terminal, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 text-zinc-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-mono font-bold text-lg tracking-wider hover:opacity-80 transition">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>NEXTUS</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-zinc-100 transition">Features</a>
          <a href="#pricing" className="hover:text-zinc-100 transition">Pricing</a>
          
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-zinc-800">
              <Link to="/dashboard" className="text-zinc-100 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-md hover:bg-zinc-800 transition">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout} 
                className="text-zinc-400 hover:text-red-400 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
              <Link to="/login" className="hover:text-zinc-100 transition">Log in</Link>
              <Link 
                to="/register" 
                className="bg-zinc-100 text-zinc-950 px-3.5 py-1.5 rounded-md font-semibold text-sm hover:bg-zinc-200 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}