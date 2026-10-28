import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";
import { RevealSingle } from "./motion/Reveal";
import { siteConfig } from "../config/site";

interface TerminalHistory {
  command: string;
  output: string | React.ReactNode;
}

const COMMAND_LIST = ["help", "languages", "projects", "skills", "whoami", "hire", "clear"];

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalHistory[]>([
    {
      command: "whoami",
      output: (
        <div className="text-slate-300">
          <p className="font-bold text-[var(--accent-blue)]">
            {siteConfig.name} · B.Tech CSE (Blockchain) @ {siteConfig.university}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Passionate Web3 & full-stack developer building decentralized systems, smart contracts, and responsive TypeScript applications.
          </p>
        </div>
      ),
    },
    {
      command: "languages",
      output: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono my-1">
          <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
            <span className="text-[var(--accent-violet)] font-bold">📜 Solidity (Web3)</span>
            <span className="text-emerald-400">Advanced / DApps</span>
          </div>
          <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
            <span className="text-[var(--accent-blue)] font-bold">⚛️ TypeScript & React</span>
            <span className="text-emerald-400">Strict / Advanced</span>
          </div>
          <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
            <span className="text-[var(--accent-cyan)] font-bold">🐍 Python</span>
            <span className="text-emerald-400">Crypto & Scripts</span>
          </div>
          <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
            <span className="text-amber-400 font-bold">☕ Java</span>
            <span className="text-emerald-400">OOP & Systems</span>
          </div>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let outputNode: React.ReactNode;

    switch (trimmed) {
      case "help":
        outputNode = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="text-slate-400">Available commands:</p>
            <p><span className="text-emerald-400 font-bold">languages</span> - Display programming language stack & proficiency</p>
            <p><span className="text-emerald-400 font-bold">projects</span> - View featured open-source repositories</p>
            <p><span className="text-emerald-400 font-bold">skills</span> - Inspect technical skills matrix</p>
            <p><span className="text-emerald-400 font-bold">whoami</span> - Display developer bio and background</p>
            <p><span className="text-emerald-400 font-bold">hire</span> - View internship availability and contact channels</p>
            <p><span className="text-emerald-400 font-bold">clear</span> - Clear the terminal output</p>
          </div>
        );
        break;

      case "languages":
        outputNode = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono my-1">
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
              <span className="text-[var(--accent-violet)] font-bold">📜 Solidity</span>
              <span className="text-emerald-400">Smart Contracts & Tokens</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
              <span className="text-[var(--accent-blue)] font-bold">⚛️ TypeScript</span>
              <span className="text-emerald-400">React, Next.js, Node.js</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
              <span className="text-[var(--accent-cyan)] font-bold">🐍 Python</span>
              <span className="text-emerald-400">Data, Automation, Crypto</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
              <span className="text-amber-400 font-bold">☕ Java</span>
              <span className="text-emerald-400">Algorithms & Multithreading</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
              <span className="text-sky-400 font-bold">⚙️ C / C++</span>
              <span className="text-emerald-400">Data Structures & Performance</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-2 rounded border border-white/10">
              <span className="text-indigo-400 font-bold">🗄️ SQL</span>
              <span className="text-emerald-400">PostgreSQL, Relational DBs</span>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="text-xs text-slate-300 space-y-1 my-1">
            <p className="font-bold text-white">Projects:</p>
            <p className="text-slate-400">
              Projects will appear here as they are published. Stay tuned!
            </p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="text-xs text-slate-300">
            <p className="text-emerald-400 font-bold">Core Competencies:</p>
            <p className="text-slate-400 mt-0.5">
              Smart Contracts (Solidity) · DApp Frontend (React, TypeScript) · Hashing & Mining (Python) · Concurrent Algorithms (Java) · WebSockets & Ethers.js
            </p>
          </div>
        );
        break;

      case "whoami":
        outputNode = (
          <div className="text-xs text-slate-300 space-y-1">
            <p className="font-bold text-white">{siteConfig.name}</p>
            <p className="text-slate-400">{siteConfig.headline}</p>
            <p className="text-slate-400">Based in: {siteConfig.location}</p>
          </div>
        );
        break;

      case "hire":
        outputNode = (
          <div className="text-xs text-emerald-400 space-y-1 p-2 bg-emerald-500/10 rounded border border-emerald-500/30">
            <p className="font-bold text-white">✨ Available for Internships & Projects!</p>
            <p>Email: <a href={`mailto:${siteConfig.personalEmail}`} className="underline text-emerald-300">{siteConfig.personalEmail}</a></p>
            <p>LinkedIn: <a href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer" className="underline text-emerald-300">View LinkedIn Profile</a></p>
          </div>
        );
        break;

      default:
        outputNode = (
          <p className="text-xs text-rose-400">
            Command not recognized: "{trimmed}". Type <span className="font-bold underline text-white">help</span> for a list of commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdToRun, output: outputNode }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <section id="terminal-zone" className="section-padding relative overflow-hidden" aria-label="Interactive Developer Console">
      <div className="section-container relative z-10">
        <RevealSingle className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-md"
            style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))" }}
          >
            <TerminalIcon size={22} className="text-white" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent-cyan)] mb-2">
            Developer CLI
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-3">
            Interactive <span className="gradient-text">Terminal</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm sm:text-base font-normal">
            For technical recruiters and developers: explore my stack, repositories, and credentials directly via an interactive command-line interface.
          </p>
        </RevealSingle>

        <RevealSingle delay={0.1}>
          <div
            className="rounded-2xl overflow-hidden glass-card shadow-2xl border border-[var(--border)] max-w-4xl mx-auto"
            style={{ background: "rgba(7, 11, 24, 0.96)" }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  hemanth@vitap-blockchain:~$
                </span>
              </div>

              {/* Quick Command Pills */}
              <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[11px] text-slate-500 font-mono mr-1">Quick:</span>
                {COMMAND_LIST.slice(0, 5).map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Output Area */}
            <div className="p-5 font-mono text-xs sm:text-sm text-slate-200 max-h-[380px] overflow-y-auto space-y-3.5">
              <p className="text-slate-500 text-xs">
                Welcome to Hemanth's interactive terminal console v2.4. Type <span className="text-emerald-400 font-bold">help</span> to begin.
              </p>

              {history.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <span className="text-emerald-400">guest@hemanth-os:~$</span>
                    <span className="text-white font-bold">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}

              <div ref={terminalEndRef} />
            </div>

            {/* Terminal Input Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-t border-white/10 font-mono text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold">guest@hemanth-os:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'languages', 'projects', 'hire'..."
                className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono"
              />
              <button
                type="button"
                onClick={() => handleCommand(input)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Send terminal command"
              >
                <CornerDownLeft size={16} />
              </button>
            </div>
          </div>
        </RevealSingle>
      </div>
    </section>
  );
}
