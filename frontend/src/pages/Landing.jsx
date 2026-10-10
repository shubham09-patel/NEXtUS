import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { 
  Code2, 
  Layers, 
  BrainCircuit, 
  BookOpen, 
  ArrowRight, 
  Send, 
  Mail, 
  MapPin, 
  Sparkles,
  MessageSquare,
  Globe
} from "lucide-react";

export default function Landing() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Auth Protection Redirect
  const handleFeatureClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans relative overflow-x-hidden pt-28 selection:bg-indigo-500 selection:text-white">
      
      {/* Background Subtle Grid Pattern & Purple Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e12_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-20 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/30 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>NEXTUS AI Platform v2.0</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-[1.15]"
        >
          Master Code & System Design with an <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
            AI Developer Workspace
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          Debug complex stack traces, generate production HLD/LLD schemas, and practice real-time technical interviews — built for software engineers.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => handleFeatureClick("/dashboard")}
            className="w-full sm:w-auto bg-white text-zinc-950 font-semibold px-7 py-3 rounded-full hover:bg-zinc-200 transition duration-300 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2 text-sm cursor-pointer hover:scale-105 active:scale-95"
          >
            Explore Workspace <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#features"
            className="w-full sm:w-auto bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 font-medium px-7 py-3 rounded-full hover:bg-zinc-800 hover:text-white transition duration-300 text-sm hover:scale-105 active:scale-95"
          >
            View Features
          </a>
        </motion.div>

        <p className="mt-12 text-xs text-zinc-500 font-mono">
          Trusted by 10K+ developers • Built for High-Performance Engineering
        </p>
      </section>

      {/* REFINED 4-CORE FEATURES GRID */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">Core Software Tasks</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-md mx-auto">
            Zero fluff. Four powerful AI engines designed to accelerate your engineering workflow.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          
          {/* Feature 1: System Design Copilot (NEW CORE FEATURE) */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleFeatureClick("/system-design")}
            className="p-8 rounded-3xl bg-[#0b0b10]/90 border border-zinc-800/80 hover:border-violet-500/60 transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-2xl backdrop-blur-xl hover:shadow-violet-500/10"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-violet-950/50 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-md shadow-violet-500/20">
                <Layers className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-semibold text-violet-300 mb-3">
                HIGH IMPACT
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition">
                System Design Copilot
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Generate production-ready High-Level Architecture, Prisma DB Schemas, API Specs, and caching strategy for any scalable app idea.
              </p>
            </div>

            <div className="mt-8 text-xs font-semibold text-violet-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Launch System Design Copilot <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Feature 2: Smart Code Debugger */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleFeatureClick("/debug-code")}
            className="p-8 rounded-3xl bg-[#0b0b10]/90 border border-zinc-800/80 hover:border-indigo-500/60 transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-2xl backdrop-blur-xl hover:shadow-indigo-500/10"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300 shadow-md shadow-indigo-500/20">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition">
                Smart Code Debugger
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Paste stack traces or buggy snippets to get root-cause breakdowns, clean code refactorings, and side-by-side diffs.
              </p>
            </div>

            <div className="mt-8 text-xs font-semibold text-indigo-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Launch Debugger Engine <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Feature 3: AI Mock Interviewer */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleFeatureClick("/interview")}
            className="p-8 rounded-3xl bg-[#0b0b10]/90 border border-zinc-800/80 hover:border-rose-500/60 transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-2xl backdrop-blur-xl hover:shadow-rose-500/10"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-md shadow-rose-500/20">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-rose-300 transition">
                AI Mock Interviewer
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Practice real-time technical interview questions with dynamic topic customization, live answer scoring, and final verdict reports.
              </p>
            </div>

            <div className="mt-8 text-xs font-semibold text-rose-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Start Mock Interview <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

          {/* Feature 4: AI Technical Chat */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleFeatureClick("/chat")}
            className="p-8 rounded-3xl bg-[#0b0b10]/90 border border-zinc-800/80 hover:border-amber-500/60 transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden shadow-2xl backdrop-blur-xl hover:shadow-amber-500/10"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-600/20 rounded-full blur-3xl group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:-rotate-6 group-hover:scale-110 transition-all duration-300 shadow-md shadow-amber-500/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition">
                AI Technical Chat
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Context-aware CS assistant for algorithms, framework syntax, memory management, and quick software architecture queries.
              </p>
            </div>

            <div className="mt-8 text-xs font-semibold text-amber-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Start AI Chat <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Testimonials Banner Box */}
      <section className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0b0b10] border border-zinc-800/80 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-indigo-600/15 blur-3xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
            TESTIMONIALS
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-xl mx-auto">
            Trusted by leaders <br />
            from top tech companies
          </h2>

          <p className="text-zinc-400 text-sm max-w-lg mx-auto mt-4 leading-relaxed">
            Discover how thousands of developers rely on NEXTUS AI to accelerate their learning and streamline their coding workflow 24/7.
          </p>

          <button 
            onClick={() => handleFeatureClick("/dashboard")}
            className="mt-8 bg-white text-zinc-950 font-semibold px-8 py-3.5 rounded-full hover:bg-zinc-200 transition duration-300 text-sm inline-flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            Get Started Now <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </section>

      {/* Let's Connect Section */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <div className="w-10 h-10 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">Connect</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-md mx-auto">
            Have a question or just want to say hi? We're always open to discussing new features and feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          
          {/* Social Links Column */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#0d0d12] border border-zinc-800/80 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">EMAIL</p>
                <p className="text-xs font-medium text-zinc-200">shubham@nextus.ai</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-zinc-800/80 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">GITHUB</p>
                <p className="text-xs font-medium text-zinc-200">github.com/shubhampatel</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-zinc-800/80 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">LINKEDIN</p>
                <p className="text-xs font-medium text-zinc-200">linkedin.com/in/shubhampatel</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0d0d12] border border-zinc-800/80 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">LOCATION</p>
                <p className="text-xs font-medium text-zinc-200">India</p>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-[#0d0d12] border border-zinc-800/80 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">FULL NAME</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-[#14141c] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">EMAIL ADDRESS</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full bg-[#14141c] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">YOUR MESSAGE</label>
              <textarea 
                rows={4} 
                placeholder="How can I help you?" 
                className="w-full bg-[#14141c] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition resize-none"
              ></textarea>
            </div>

            <button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer">
              <Send className="w-3.5 h-3.5" /> Send Message
            </button>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 bg-[#08080c] py-12 relative z-10 text-xs">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-extrabold text-white text-base">NEXTUS<span className="text-indigo-400">.AI</span></span>
            <p className="text-zinc-500 mt-2 text-[11px] leading-relaxed">
              Your AI-powered developer platform to master programming, DSA, system design, and debugging.
            </p>
          </div>

          <div>
            <p className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider mb-3">QUICK LINKS</p>
            <ul className="space-y-2 text-zinc-500">
              <li><a href="#features" className="hover:text-zinc-300 transition">Features</a></li>
              <li><a href="#contact" className="hover:text-zinc-300 transition">Contact Us</a></li>
              <li><Link to="/register" className="hover:text-zinc-300 transition">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider mb-3">TOOLS</p>
            <ul className="space-y-2 text-zinc-500">
              <li><button onClick={() => handleFeatureClick("/system-design")} className="hover:text-zinc-300 transition cursor-pointer">System Design Copilot</button></li>
              <li><button onClick={() => handleFeatureClick("/debug-code")} className="hover:text-zinc-300 transition cursor-pointer">Bug Analyzer</button></li>
              <li><button onClick={() => handleFeatureClick("/interview")} className="hover:text-zinc-300 transition cursor-pointer">Interview Prep</button></li>
              <li><button onClick={() => handleFeatureClick("/chat")} className="hover:text-zinc-300 transition cursor-pointer">Tech Chat</button></li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider mb-3">FOLLOW US</p>
            <div className="flex gap-3 text-zinc-400">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-white transition cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:text-white transition cursor-pointer">
                <Globe className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-zinc-900 text-center text-zinc-600 text-[11px]">
          © 2026 NEXTUS AI Platform. All rights reserved.
        </div>
      </footer>

    </div>
  );
}