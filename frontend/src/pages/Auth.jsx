import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, ArrowLeft, ArrowRight, Sparkles, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext);

  // Check initial mode from URL (/register -> signup, else login)
  const [isSignUp, setIsSignUp] = useState(location.pathname === "/register");
  
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Sync state if URL changes
  useEffect(() => {
    setIsSignUp(location.pathname === "/register");
    setError("");
  }, [location.pathname]);

  const toggleAuthMode = () => {
    setError("");
    if (isSignUp) {
      navigate("/login", { replace: true });
    } else {
      navigate("/register", { replace: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed. Please check details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex items-center justify-center p-4 sm:p-8 pt-24 sm:pt-28 relative overflow-hidden font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Background Subtle Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[140px] rounded-full pointer-events-none"></div>

      {/* Main Glass Container Box */}
      <div className="w-full max-w-5xl h-[620px] bg-[#0c0c12]/90 border border-zinc-800/80 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-2xl flex">
        
        {/* Floating Top Back-to-Home Link */}
        <div className="absolute top-6 left-6 z-30">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition group uppercase tracking-wider bg-zinc-900/60 px-3.5 py-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition" />
            Home
          </Link>
        </div>

        {/* SLIDING GRAPHIC PANEL (Moves Left <-> Right) */}
        <motion.div 
          animate={{ x: isSignUp ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
          className="hidden md:flex w-1/2 h-full absolute top-0 left-0 z-20 bg-[#0a0a10] border-r border-zinc-800/80 p-10 flex-col justify-between overflow-hidden"
        >
          {/* Animated Background Glow inside Graphic Panel */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Panel Header Badge */}
          <div className="relative z-10 pt-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={isSignUp ? "signup-badge" : "login-badge"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isSignUp ? "FUTURE OF ENGINEERING" : "AI-POWERED MENTORSHIP"}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Panel Content (Text & Dynamic Showcase) */}
          <div className="relative z-10 my-auto py-6">
            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.div
                  key="signup-text"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-zinc-800/90 bg-[#0e0e16]/80 p-7 backdrop-blur-xl shadow-xl"
                >
                  <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                    Start Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
                      AI Journey
                    </span>
                  </h2>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                    Create your developer identity and gain instant access to system design copilot, bug debugging, and AI mock interviews.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800/80">
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <p className="text-base font-bold text-white">4-in-1</p>
                      <p className="text-[10px] text-zinc-500 uppercase">AI ENGINES</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <p className="text-base font-bold text-white">24/7</p>
                      <p className="text-[10px] text-zinc-500 uppercase">REAL-TIME ACCESS</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="login-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-zinc-800/90 bg-[#0e0e16]/80 p-7 backdrop-blur-xl shadow-xl"
                >
                  <h2 className="text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
                    Level Up Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
                      Coding Skills
                    </span>
                  </h2>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                    Welcome back to NEXTUS. Continue your system architecture sessions, debug code, and track interview performance.
                  </p>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      SYSTEM ACTIVE
                    </span>
                    <span>10K+ ENGINEERS REGISTERED</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative z-10 text-[11px] text-zinc-600 font-mono">
            © 2026 NEXTUS AI Workspace
          </div>
        </motion.div>


        {/* FORM CONTAINER (Occupies whole space, input slides opposite) */}
        <motion.div 
          animate={{ x: isSignUp ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 180, damping: 25 }}
          className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 sm:p-12 relative z-10"
        >
          <div className="max-w-sm w-full mx-auto">
            
            {/* Header Titles */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isSignUp ? "signup-header" : "login-header"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="text-zinc-400 text-xs mb-6">
                  {isSignUp 
                    ? "Join the next generation of developers." 
                    : "Please enter your security key to sign in."}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Error Message Alert */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Dynamic Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name Field (Only on Sign Up) */}
              <AnimatePresence>
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 16 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
                      FULL NAME
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required={isSignUp}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Shubham Patel"
                        className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
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
                    className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    SECURITY KEY
                  </label>
                  {!isSignUp && (
                    <span className="text-[10px] font-semibold text-indigo-400 hover:underline cursor-pointer">
                      FORGOT PASSWORD?
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#111118] border border-zinc-800/90 rounded-xl pl-10 pr-10 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
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

              {isSignUp && (
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>END-TO-END ENCRYPTED ACCESS</span>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={loading}
                className="w-full mt-3 bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-95 transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing..." : isSignUp ? "CREATE IDENTITY" : "ENTER PLATFORM"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </form>

            {/* Toggle Link (Triggers Smooth Shift Animation) */}
            <p className="mt-6 text-center text-xs text-zinc-500">
              {isSignUp ? "Already on board? " : "Don't have an account? "}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-indigo-400 hover:text-indigo-300 font-semibold underline cursor-pointer"
              >
                {isSignUp ? "Sign In" : "Create Account"}
              </button>
            </p>

          </div>
        </motion.div>

      </div>
    </div>
  );
}