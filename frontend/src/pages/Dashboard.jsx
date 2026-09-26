import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MessageSquare, Bug, ArrowRightLeft, Award, Sparkles, ShieldCheck } from "lucide-react";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const tools = [
    {
      id: "chat",
      title: "AI Technical Chat",
      description: "Ask algorithms, system design, or framework architecture questions.",
      icon: MessageSquare,
      color: "text-cyan-400",
      borderColor: "hover:border-cyan-500/50",
      link: "/chat",
    },
    {
      id: "debugger",
      title: "Smart Code Debugger",
      description: "Paste buggy code or stack traces for instant root-cause fixes.",
      icon: Bug,
      color: "text-red-400",
      borderColor: "hover:border-red-500/50",
      link: "/debug-code",
    },
    {
      id: "converter",
      title: "Code Converter",
      description: "Seamlessly translate code snippets across programming languages.",
      icon: ArrowRightLeft,
      color: "text-blue-400",
      borderColor: "hover:border-blue-500/50",
      link: "/convert-code",
    },
    {
      id: "interview",
      title: "AI Mock Interviewer",
      description: "Practice dynamic technical Q&A sessions with real-time scoring.",
      icon: Award,
      color: "text-amber-400",
      borderColor: "hover:border-amber-500/50",
      link: "/interview",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 text-zinc-100 p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* User Greeting & Plan Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Welcome back, {user?.name || "Developer"}
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Select a tool below to start building or debugging.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-400">Current Plan:</span>
            <span className="text-cyan-400 uppercase font-semibold">{user?.planName || "Free"}</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                to={tool.link}
                className={`p-6 border border-zinc-800 bg-zinc-900/40 rounded-xl transition duration-200 ${tool.borderColor} hover:bg-zinc-900/80 group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-6 h-6 ${tool.color}`} />
                    <Sparkles className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition" />
                  </div>
                  <h2 className="text-lg font-semibold text-white mb-2">{tool.title}</h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">{tool.description}</p>
                </div>
                <div className="mt-6 text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition flex items-center gap-1">
                  Launch Tool &rarr;
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}