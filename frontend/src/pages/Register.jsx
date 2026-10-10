import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowLeft, Sparkles, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Account creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex overflow-hidden">
      
      {/* LEFT PANEL: Cyberpunk Glass Showcase */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative bg-[#09090e] border-r border-zinc-800/80 p-12 flex-col justify-between overflow-hidden"
      >
        {/* Animated Purple Gradient Glows */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Top Tagline */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>FUTURE OF LEARNING</span>
          </div>
        </div>

        {/* Center Futuristic Graphic Card */}
        <div className="relative z-10 my-auto py-8">
          <div className="relative rounded-2xl border border-zinc-800/90 bg-[#0d0d14]/80 p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 via-transparent to-indigo-500/10 opacity-50"></div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Start Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
                AI Journey
              </span>
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Create your identity and gain instant access to high-performance learning roadmaps, bug debugging, and AI-driven mentorship.
            </p>

            {/* Quick Stats Chips */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <p className="text-lg font-bold text-white">100+</p>
                <p className="text-[10px] text-zinc-500 uppercase">ROADMAPS</p>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <p className="text-lg font-bold text-white">24/7</p>
                <p className="text-[10px] text-zinc-500 uppercase">AI SUPPORT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-zinc-600">
          © 2026 NEXTUS AI Platform. All rights reserved.
        </div>
      </motion.div>

      {/* RIGHT PANEL: Form Section */}
      <motion.div 
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 md:p-16 relative z-10"
      >
        {/* Back to Home Link */}
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition group uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
            Back to home
          </Link>
        </div>

        {/* Center Form Container */}
        <div className="max-w-sm w-full mx-auto my-auto py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Create Account
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mb-8">
            Join the next generation of developers.
          </p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                FULL NAME
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Shubham Patel"
                  className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                EMAIL DESTINATION
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                SECURITY KEY
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-10 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Encrypted badge */}
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>END-TO-END ENCRYPTED SECURITY</span>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-indigo-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-95 transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-violet-600/30 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {loading ? "Creating Identity..." : "CREATE IDENTITY"}
            </motion.button>
          </form>

          {/* Toggle link */}
          <p className="mt-8 text-center text-xs text-zinc-500">
            Already on board?{" "}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold underline">
              Sign In
            </Link>
          </p>
        </div>

        <div></div>
      </motion.div>

    </div>
  );
}