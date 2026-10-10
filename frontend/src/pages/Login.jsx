import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ArrowRight, Sparkles, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or security key.");
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
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Top Tagline */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI-POWERED MENTORSHIP</span>
          </div>
        </div>

        {/* Center Futuristic Graphic Card */}
        <div className="relative z-10 my-auto py-8">
          <div className="relative rounded-2xl border border-zinc-800/90 bg-[#0d0d14]/80 p-8 backdrop-blur-xl shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-violet-500/10 opacity-50"></div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Level Up Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
                Coding Skills
              </span>
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-md">
              Join thousands of developers mastering DSA, System Design, and Full-Stack engineering with your specialized AI platform.
            </p>

            {/* Glowing HUD Lines */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                SYSTEM ACTIVE
              </span>
              <span>TRUSTED BY 10K+ ENGINEERS</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-zinc-600">
          © 2026 NEXTUS AI Platform. All rights reserved.
        </div>
      </motion.div>

      {/* RIGHT PANEL: Sleek Form Section */}
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
            Welcome Back
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mb-8">
            Please enter your details to sign in.
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

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {/* Security Key / Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  SECURITY KEY
                </label>
                <span className="text-[10px] font-semibold text-indigo-400 hover:underline cursor-pointer">
                  FORGOT PASSWORD?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-10 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
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

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-semibold py-3.5 rounded-xl hover:opacity-95 transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "ENTER PLATFORM"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </motion.button>
          </form>

          {/* Toggle link */}
          <p className="mt-8 text-center text-xs text-zinc-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold underline">
              Create Account
            </Link>
          </p>
        </div>

        <div></div>
      </motion.div>

    </div>
  );
}
