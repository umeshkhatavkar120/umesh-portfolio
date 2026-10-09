import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience, skills, profile } from "../data/portfolio";

const COMMANDS = {
  help: () => ({
    type: "table",
    content: [
      ["about", "About Umesh"],
      ["experience", "View professional experience"],
      ["skills", "View technical skills"],
      ["game", "Explore interactive games"],
      ["contact", "Get in touch"],
      ["clear", "Clear terminal"],
      ["help", "Show available commands"],
    ],
  }),
  about: () => ({
    type: "lines",
    content: [
      "══ ABOUT ══════════════════════════════════════",
      "",
      `${profile.name}`,
      "Tech Lead | Senior Backend Engineer",
      "",
      "8+ years of experience designing and delivering",
      "scalable enterprise applications across fintech",
      "and edtech domains.",
      "",
      "Core strengths:",
      "  • Backend Engineering & System Design",
      "  • Microservices Architecture",
      "  • Performance Optimization",
      "  • API Design & Database Optimization",
      "  • Cloud Infrastructure (AWS)",
      "  • Technical Leadership",
      "",
      "Currently building scalable platforms at WiZR.",
    ],
  }),
  experience: () => {
    const lines = ["══ EXPERIENCE ═════════════════════════════════", ""];
    experience.forEach((exp, i) => {
      if (i > 0) lines.push("", "────────────────────────────────────────", "");
      lines.push(exp.role);
      lines.push(exp.company);
      lines.push(exp.period);
      lines.push("");
      exp.achievements.slice(0, 4).forEach((a) => {
        lines.push(`  • ${a}`);
      });
    });
    return { type: "lines", content: lines };
  },
  skills: () => {
    const lines = ["══ SKILLS ═════════════════════════════════════", ""];
    skills.forEach((group) => {
      lines.push(`▸ ${group.category}`);
      lines.push(`  ${group.items.join(" · ")}`);
      lines.push("");
    });
    return { type: "lines", content: lines };
  },
  game: () => ({
    type: "action",
    action: "scroll",
    target: "#games",
    content: ["Navigating to Games section..."],
  }),
  games: () => COMMANDS.game(),
  contact: () => ({
    type: "action",
    action: "scroll",
    target: "#contact",
    content: ["Navigating to Contact section..."],
  }),
  exp: () => COMMANDS.experience(),
  skill: () => COMMANDS.skills(),
};

const PROMPT = "umesh@portfolio ~ % ";

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "experience",
  "skills",
  "game",
  "contact",
  "clear",
  "exp",
  "skill",
  "games",
];

export default function Terminal() {
  const [history, setHistory] = useState([
    {
      type: "output",
      result: {
        type: "lines",
        content: [
          "Welcome to Umesh's portfolio.",
          "",
          'Type "help" to see available commands.',
        ],
      },
    },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    if (input.length > 0) {
      const match = AVAILABLE_COMMANDS.find(
        (c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()
      );
      setSuggestion(match || "");
    } else {
      setSuggestion("");
    }
  }, [input]);

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const entry = { type: "command", text: cmd.trim() };
    const handler = COMMANDS[trimmed];

    if (handler) {
      const result = handler();
      setHistory((h) => [...h, entry, { type: "output", result }]);
      if (result.action === "scroll") {
        setTimeout(() => {
          document
            .querySelector(result.target)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else if (trimmed === "") {
      setHistory((h) => [...h, entry]);
    } else {
      setHistory((h) => [
        ...h,
        entry,
        {
          type: "output",
          result: {
            type: "lines",
            content: [
              `Command not found: ${cmd.trim()}`,
              "",
              'Type "help" to see available commands.',
            ],
          },
        },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input;
    if (cmd.trim()) {
      setCmdHistory((h) => [cmd, ...h]);
    }
    setHistoryIdx(-1);
    executeCommand(cmd);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    } else if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setInput(suggestion);
      setSuggestion("");
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const renderResult = (result) => {
    if (result.type === "table") {
      return (
        <div className="py-1">
          <div className="text-text-secondary mb-2">Available commands:</div>
          {result.content.map(([cmd, desc], i) => (
            <div key={i} className="flex gap-4 pl-2">
              <span className="text-accent w-20 flex-shrink-0">{cmd}</span>
              <span className="text-text-muted">→ {desc}</span>
            </div>
          ))}
        </div>
      );
    }
    if (result.type === "lines" || result.type === "action") {
      return (
        <div className="py-1 whitespace-pre-wrap break-words">
          {result.content.map((line, i) => (
            <div key={i} className={line.startsWith("══") || line.startsWith("──") ? "text-accent" : "text-text-secondary"}>
              {line || " "}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="terminal" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Terminal"
          subtitle="Explore the portfolio using terminal commands"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-surface-border bg-surface-card overflow-hidden shadow-2xl shadow-black/20"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-light border-b border-surface-border">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="flex-1 text-center text-xs text-text-muted font-mono">
              umesh@portfolio
            </span>
          </div>

          <div
            ref={scrollRef}
            className="p-4 font-mono text-sm min-h-[300px] max-h-[480px] overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, i) => (
              <div key={i} className="mb-1">
                {entry.type === "command" && (
                  <div>
                    <span className="text-green-400">{PROMPT}</span>
                    <span className="text-text-primary">{entry.text}</span>
                  </div>
                )}
                {entry.type === "output" && renderResult(entry.result)}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex items-center relative">
              <span className="text-green-400 flex-shrink-0">{PROMPT}</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-text-primary outline-none caret-accent font-mono text-sm"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal command input"
                />
                {suggestion && input && (
                  <span className="absolute left-0 top-0 text-text-muted pointer-events-none">
                    {input}
                    <span className="opacity-40">
                      {suggestion.slice(input.length)}
                    </span>
                  </span>
                )}
              </div>
            </form>
          </div>
        </motion.div>

        <p className="text-center text-text-muted text-xs mt-3 font-mono">
          Tab to autocomplete · ↑↓ for history · Ctrl+L to clear
        </p>
      </div>
    </section>
  );
}
