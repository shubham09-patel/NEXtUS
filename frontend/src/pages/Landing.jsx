import { Link } from "react-router-dom";
import { Terminal, Bug, ArrowRightLeft, MessageSquare, Award, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center border-b border-zinc-800/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-mono text-cyan-400 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          NEXTUS v1.0 • Gemini 2.5 AI Powered Engine
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Supercharge your workflow with an <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">all-in-one AI platform</span>
        </h1>

        <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Debug code instantly, convert languages seamlessly, and practice technical mock interviews in a minimalist workspace built for developers.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto bg-zinc-100 text-zinc-950 font-semibold px-6 py-3 rounded-lg hover:bg-zinc-200 transition flex items-center justify-center gap-2 text-sm"
          >
            Start Building Free <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#features"
            className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium px-6 py-3 rounded-lg hover:bg-zinc-800 transition text-sm"
          >
            Explore Features
          </a>
        </div>

        {/* Live Code Preview Mockup */}
        <div className="mt-16 border border-zinc-800 bg-zinc-900/40 rounded-xl p-4 text-left font-mono text-sm max-w-3xl mx-auto shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 border-b border-zinc-800 pb-3">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="text-xs text-zinc-500 ml-2">nextus-engine.js</span>
          </div>
          <p className="text-zinc-500">// AI Terminal Simulation</p>
          <p className="text-emerald-400 mt-2">✓ Status 200 OK • Memory leak resolved</p>
          <p className="text-zinc-300 mt-1">&gt; Neon PostgreSQL connection pool optimized.</p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-5xl mx-auto px-6 py-20 border-b border-zinc-800/80">
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Platform Engine</h2>
        <p className="text-zinc-400 mb-12 text-sm">Essential tools designed strictly for core software engineering tasks.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition">
            <MessageSquare className="w-6 h-6 text-cyan-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">AI Tech Chat</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Context-aware technical assistant tuned for software architecture, system design, and algorithmic problem solving.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition">
            <Bug className="w-6 h-6 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Smart Code Debugger</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Paste stack traces or buggy snippets to get root-cause breakdowns and production-ready code fixes.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition">
            <ArrowRightLeft className="w-6 h-6 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Multi-Language Converter</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Translate code between frameworks and languages seamlessly (e.g., JavaScript to TypeScript, C++ to Swift).
            </p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:border-zinc-700 transition">
            <Award className="w-6 h-6 text-amber-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">AI Mock Interviewer</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Real-time technical interview simulator with topic customization, live evaluations, and detailed scorecards.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500">
        <p>© 2026 NEXTUS Platform. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <span className="hover:text-zinc-300 transition cursor-pointer">Docs</span>
          <span className="hover:text-zinc-300 transition cursor-pointer">GitHub</span>
        </div>
      </footer>
    </div>
  );
}