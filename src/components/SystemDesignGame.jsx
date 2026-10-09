import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Check, X, RotateCcw, ChevronDown, Trophy,
  Monitor, Network, Server, Database, Zap, Globe, Send,
  Cpu, Shield, HardDrive, Layers, GitBranch, AlertTriangle,
  CornerDownRight, LayoutGrid, Clipboard, CreditCard, User, Gauge,
} from "lucide-react";
import Button from "./Button";
import { levels } from "../data/systemDesignLevels";

const STORAGE_KEY = "sdg-progress";
const POINTS_PER_LEVEL = 100;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadProgress() {
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(d)) {
      const validIds = new Set(levels.map((l) => l.id));
      return d.filter((id) => typeof id === "string" && validIds.has(id));
    }
  } catch {}
  return [];
}

function saveProgress(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

function getInitialLevel(completed) {
  for (let i = 0; i < levels.length; i++) {
    if (!completed.includes(levels[i].id)) {
      if (i === 0 || completed.includes(levels[i - 1].id)) return i;
    }
  }
  return 0;
}

const ICONS = {
  monitor: Monitor, network: Network, server: Server, database: Database,
  zap: Zap, globe: Globe, send: Send, cpu: Cpu, shield: Shield,
  "hard-drive": HardDrive, layers: Layers, "git-branch": GitBranch,
  "alert-triangle": AlertTriangle, "corner-down-right": CornerDownRight,
  "layout-grid": LayoutGrid, clipboard: Clipboard, "credit-card": CreditCard,
  user: User, gauge: Gauge,
};

function CompIcon({ name, size = 14, className = "" }) {
  const Icon = ICONS[name] || Server;
  return <Icon size={size} className={className} />;
}

function LevelSelector({ currentLevel, completedLevels, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {levels.map((level, i) => {
        const completed = completedLevels.includes(level.id);
        const locked = i > 0 && !completedLevels.includes(levels[i - 1].id);
        const active = i === currentLevel;

        let cls = "border-surface-border bg-surface-light text-text-muted";
        if (active) cls = "border-accent bg-accent/10 text-accent";
        else if (completed) cls = "border-green-500/30 bg-green-500/5 text-green-400";
        else if (locked) cls = "border-surface-border bg-surface-light text-text-muted opacity-30";

        return (
          <button
            key={level.id}
            onClick={() => !locked && onSelect(i)}
            disabled={locked}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-mono transition-all ${cls} ${locked ? "cursor-not-allowed" : ""}`}
            title={locked ? "Complete previous level to unlock" : level.title}
          >
            {locked ? <Lock size={10} /> : completed ? <Check size={10} /> : <span>{i + 1}</span>}
            <span className="hidden sm:inline">{level.title}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        );
      })}
    </div>
  );
}

function ComponentCard({ component, isSelected, onSelect, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, component.id)}
      onClick={() => onSelect(component.id)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(component.id)}
      role="button"
      tabIndex={0}
      aria-label={`Select ${component.label}`}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all select-none ${
        isSelected
          ? "border-accent bg-accent/15 text-accent ring-1 ring-accent/30 shadow-[0_0_12px_rgba(34,211,238,0.1)]"
          : "border-surface-border bg-surface-card text-text-secondary hover:border-accent/30 hover:text-text-primary"
      }`}
    >
      <CompIcon name={component.icon} size={13} className={isSelected ? "text-accent" : "text-text-muted"} />
      <span className="font-mono truncate">{component.label}</span>
    </div>
  );
}

function ArchitectureSlot({
  slot: _slot, index, placement, component, isError, isDragOver,
  hasSelection, onClick, onDragOver, onDragLeave, onDrop, hint,
}) {
  const isEmpty = !placement;
  let borderCls = "border-dashed border-surface-border";
  let bgCls = "bg-surface-card/20";
  let statusIcon = null;

  if (isError) {
    borderCls = "border-red-500/60 border-solid";
    bgCls = "bg-red-500/8";
    statusIcon = <X size={14} className="text-red-400" />;
  } else if (placement) {
    borderCls = "border-green-500/40 border-solid";
    bgCls = "bg-green-500/5";
    statusIcon = <Check size={14} className="text-green-400" />;
  } else if (isDragOver || hasSelection) {
    borderCls = "border-accent/60 border-dashed";
    bgCls = "bg-accent/5";
  }

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border transition-all duration-200 ${borderCls} ${bgCls} ${
        isEmpty && !isError ? "cursor-pointer" : ""
      }`}
      onClick={isEmpty ? onClick : undefined}
      onDragOver={isEmpty ? onDragOver : undefined}
      onDragLeave={isEmpty ? onDragLeave : undefined}
      onDrop={isEmpty ? onDrop : undefined}
      role={isEmpty ? "button" : undefined}
      tabIndex={isEmpty ? 0 : undefined}
      onKeyDown={(e) => isEmpty && e.key === "Enter" && onClick()}
      aria-label={
        placement
          ? `Slot ${index + 1}: ${component?.label} (correct)`
          : `Slot ${index + 1}: empty. ${hint || "Drop a component here."}`
      }
    >
      <span
        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
          placement ? "bg-green-500/20 text-green-400"
            : isError ? "bg-red-500/20 text-red-400"
            : "bg-surface-border/60 text-text-muted"
        }`}
      >
        {index + 1}
      </span>

      <div className="flex-1 min-w-0">
        {placement && component ? (
          <div className="flex items-center gap-2">
            <CompIcon name={component.icon} size={13} className="text-green-400 shrink-0" />
            <span className="font-mono text-xs text-green-400 truncate">{component.label}</span>
          </div>
        ) : isError ? (
          <span className="font-mono text-xs text-red-400">Incorrect — try again</span>
        ) : (
          <span className="font-mono text-[11px] text-text-muted/60 italic truncate">
            {hint || "Drop component here"}
          </span>
        )}
      </div>

      {statusIcon && <div className="shrink-0">{statusIcon}</div>}
    </div>
  );
}

function FlowArrow({ connection }) {
  const isAsync = connection?.type === "async";
  const isBranch = connection?.type === "branch";
  return (
    <div className="flex flex-col items-center py-0.5">
      <div
        className={`w-px h-4 ${
          isAsync ? "border-l-2 border-dashed border-purple-400/20"
            : isBranch ? "border-l-2 border-dotted border-amber-400/20"
            : "bg-accent/15"
        }`}
      />
      <ChevronDown size={10} className={`-my-0.5 ${
        isAsync ? "text-purple-400/30" : isBranch ? "text-amber-400/30" : "text-accent/25"
      }`} />
      {connection?.label && (
        <span className={`text-[9px] font-mono mt-0.5 ${
          isAsync ? "text-purple-400/40" : isBranch ? "text-amber-400/40" : "text-text-muted/50"
        }`}>
          {isAsync && "⚡ "}{isBranch && "↳ "}{connection.label}
        </span>
      )}
    </div>
  );
}

function LevelCompletionPanel({ level, attempts, isLastLevel, allComplete, onContinue, onReview }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onReview}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="bg-surface-card border border-surface-border rounded-xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1, damping: 12 }}
            className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-3"
          >
            <Check size={28} className="text-green-400" />
          </motion.div>
          <h3 className="text-lg font-bold text-accent mb-1 font-mono">ARCHITECTURE COMPLETE!</h3>
          <p className="text-text-secondary text-sm">
            You successfully assembled the <span className="text-text-primary">{level.title}</span> system.
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-5">
          <div className="text-center">
            <div className="text-accent font-mono text-xl font-bold">{POINTS_PER_LEVEL}</div>
            <div className="text-text-muted text-[10px] uppercase tracking-wider">Points</div>
          </div>
          <div className="text-center">
            <div className="text-text-primary font-mono text-xl font-bold">{attempts}</div>
            <div className="text-text-muted text-[10px] uppercase tracking-wider">Attempts</div>
          </div>
        </div>

        <div className="bg-surface-light rounded-lg p-3 mb-5 border border-surface-border max-h-44 overflow-y-auto">
          <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider mb-2">Key Lessons</h4>
          <ul className="space-y-1.5">
            {level.explanations.map((exp, i) => (
              <li key={i} className="text-[11px] text-text-secondary flex gap-2 leading-relaxed">
                <span className="text-accent shrink-0 mt-0.5">▸</span>
                <span>{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Button onClick={onReview} className="flex-1 text-xs !justify-center">
            Review Architecture
          </Button>
          <Button onClick={onContinue} variant="accent" className="flex-1 text-xs !justify-center">
            {allComplete ? "View Results" : isLastLevel ? "See Results" : "Next Level"}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VictoryScreen({ totalScore, onPlayAgain, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, delay: 0.1 }}
        className="mb-4"
      >
        <Trophy size={48} className="text-amber-400 mx-auto" />
      </motion.div>
      <h2 className="text-xl font-bold text-accent mb-1 font-mono">SYSTEM DESIGN MASTER</h2>
      <p className="text-text-secondary text-sm mb-5">
        You completed all five architecture challenges.
      </p>

      <div className="text-accent font-mono text-4xl font-bold mb-1">{totalScore}</div>
      <div className="text-text-muted text-xs uppercase tracking-wider mb-5">Total Points</div>

      <div className="grid grid-cols-5 gap-1.5 mb-6 max-w-sm mx-auto">
        {levels.map((level) => (
          <div key={level.id} className="bg-green-500/8 border border-green-500/25 rounded-lg p-2 text-center">
            <Check size={12} className="mx-auto text-green-400 mb-1" />
            <span className="text-[9px] font-mono text-green-400 truncate block">{level.title}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <Button onClick={onPlayAgain}>
          <RotateCcw size={14} />
          Play Again
        </Button>
        <Button onClick={onClose}>Close</Button>
      </div>
    </motion.div>
  );
}

export default function SystemDesignGame({ onClose }) {
  const [completedLevels, setCompletedLevels] = useState(loadProgress);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(() =>
    getInitialLevel(loadProgress())
  );
  const [placements, setPlacements] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [errorSlot, setErrorSlot] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [shuffledComponents, setShuffledComponents] = useState(() =>
    shuffle(levels[getInitialLevel(loadProgress())].components)
  );
  const [showCompletion, setShowCompletion] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const levelData = levels[currentLevelIndex];
  const placedIds = new Set(Object.values(placements));
  const availableComponents = shuffledComponents.filter((c) => !placedIds.has(c.id));
  const placedCount = Object.keys(placements).length;
  const totalSlots = levelData.slots.length;

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedComponent(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const switchLevel = useCallback((index) => {
    setCurrentLevelIndex(index);
    setShuffledComponents(shuffle(levels[index].components));
    setPlacements({});
    setSelectedComponent(null);
    setErrorSlot(null);
    setDragOverSlot(null);
    setAttempts(0);
    setShowCompletion(false);
    setConfirmRestart(false);
  }, []);

  const handlePlace = useCallback(
    (slotId, componentId) => {
      if (!componentId) return;
      const slot = levelData.slots.find((s) => s.id === slotId);
      if (!slot || placements[slotId]) return;

      if (slot.expectedComponentId === componentId) {
        const next = { ...placements, [slotId]: componentId };
        setPlacements(next);
        setSelectedComponent(null);
        const label = levelData.components.find((c) => c.id === componentId)?.label || componentId;
        setAnnouncement(`Correct! ${label} placed successfully.`);

        if (levelData.slots.every((s) => next[s.id])) {
          const newCompleted = [...new Set([...completedLevels, levelData.id])];
          setCompletedLevels(newCompleted);
          saveProgress(newCompleted);

          if (newCompleted.length === levels.length) {
            setTimeout(() => setGameComplete(true), 600);
          } else {
            setTimeout(() => setShowCompletion(true), 400);
          }
          setAnnouncement("Level complete! All components placed correctly.");
        }
      } else {
        setErrorSlot(slotId);
        setAttempts((a) => a + 1);
        setSelectedComponent(null);
        setAnnouncement("Incorrect placement. Try again.");
        setTimeout(() => setErrorSlot(null), 1200);
      }
    },
    [levelData, placements, completedLevels]
  );

  const handleSlotClick = useCallback(
    (slotId) => {
      if (selectedComponent && !placements[slotId]) {
        handlePlace(slotId, selectedComponent);
      }
    },
    [selectedComponent, placements, handlePlace]
  );

  const handleComponentSelect = useCallback((componentId) => {
    setSelectedComponent((prev) => (prev === componentId ? null : componentId));
  }, []);

  const handleDragStart = useCallback((e, componentId) => {
    e.dataTransfer.setData("text/plain", componentId);
    e.dataTransfer.effectAllowed = "move";
    setSelectedComponent(componentId);
  }, []);

  const handleDragOver = useCallback(
    (e, slotId) => {
      e.preventDefault();
      if (!placements[slotId]) {
        e.dataTransfer.dropEffect = "move";
        setDragOverSlot(slotId);
      }
    },
    [placements]
  );

  const handleDrop = useCallback(
    (e, slotId) => {
      e.preventDefault();
      setDragOverSlot(null);
      const componentId = e.dataTransfer.getData("text/plain");
      if (componentId) handlePlace(slotId, componentId);
    },
    [handlePlace]
  );

  const handleDragLeave = useCallback(() => setDragOverSlot(null), []);

  const resetLevel = useCallback(() => {
    setShuffledComponents(shuffle(levels[currentLevelIndex].components));
    setPlacements({});
    setSelectedComponent(null);
    setErrorSlot(null);
    setAttempts(0);
    setShowCompletion(false);
  }, [currentLevelIndex]);

  const restartGame = useCallback(() => {
    setCompletedLevels([]);
    saveProgress([]);
    setGameComplete(false);
    setConfirmRestart(false);
    switchLevel(0);
  }, [switchLevel]);

  const continueToNext = useCallback(() => {
    setShowCompletion(false);
    if (currentLevelIndex < levels.length - 1) {
      switchLevel(currentLevelIndex + 1);
    } else {
      setGameComplete(true);
    }
  }, [currentLevelIndex, switchLevel]);

  if (gameComplete) {
    return (
      <VictoryScreen
        totalScore={levels.length * POINTS_PER_LEVEL}
        onPlayAgain={restartGame}
        onClose={onClose}
      />
    );
  }

  return (
    <div>
      <div role="status" aria-live="polite" className="sr-only">{announcement}</div>

      <LevelSelector
        currentLevel={currentLevelIndex}
        completedLevels={completedLevels}
        onSelect={switchLevel}
      />

      <div className="mb-3">
        <div className="flex justify-between text-[10px] font-mono text-text-muted mb-1">
          <span>LEVEL {currentLevelIndex + 1} / {levels.length}</span>
          <span>{completedLevels.length} of {levels.length} complete</span>
        </div>
        <div className="h-1 bg-surface-light rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={false}
            animate={{ width: `${(completedLevels.length / levels.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <p className="text-[11px] text-text-muted mb-4 font-mono">
        Click a component, then click a slot to place it. Drag-and-drop also works on desktop.
      </p>

      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4">
        <div className="space-y-3 mb-4 lg:mb-0">
          <div className="bg-surface-light/50 rounded-lg p-3 border border-surface-border">
            <h4 className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1.5">Mission</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed">{levelData.mission}</p>
          </div>

          <div>
            <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1.5">
              Components ({availableComponents.length} remaining)
            </h4>
            <div className="space-y-1.5">
              <AnimatePresence mode="popLayout">
                {availableComponents.map((c) => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  >
                    <ComponentCard
                      component={c}
                      isSelected={selectedComponent === c.id}
                      onSelect={handleComponentSelect}
                      onDragStart={handleDragStart}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {availableComponents.length === 0 && (
                <p className="text-[11px] text-green-400/60 font-mono py-2 text-center">
                  All components placed!
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-text-muted py-1">
            <span>Placed: <span className="text-text-primary">{placedCount}/{totalSlots}</span></span>
            <span>Attempts: <span className="text-text-primary">{attempts}</span></span>
            <span>Score: <span className="text-accent">{completedLevels.length * POINTS_PER_LEVEL}</span></span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={resetLevel}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-surface-border bg-surface-card text-text-muted text-[11px] font-mono hover:text-text-primary hover:border-accent/30 transition-all"
            >
              <RotateCcw size={11} /> Reset Level
            </button>
            {!confirmRestart ? (
              <button
                onClick={() => setConfirmRestart(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-surface-border bg-surface-card text-text-muted text-[11px] font-mono hover:text-text-primary hover:border-accent/30 transition-all"
              >
                Restart Game
              </button>
            ) : (
              <div className="flex gap-1.5">
                <button
                  onClick={restartGame}
                  className="px-2.5 py-1.5 rounded-md border border-red-500/30 bg-red-500/5 text-red-400 text-[11px] font-mono hover:bg-red-500/10 transition-all"
                >
                  Confirm Reset
                </button>
                <button
                  onClick={() => setConfirmRestart(false)}
                  className="px-2.5 py-1.5 rounded-md border border-surface-border bg-surface-card text-text-muted text-[11px] font-mono hover:text-text-primary transition-all"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface-light/30 rounded-xl p-3 border border-surface-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Architecture Flow</h4>
            <span className="text-[10px] font-mono text-accent">
              {placedCount}/{totalSlots}
            </span>
          </div>

          <div>
            {levelData.slots.map((slot, i) => {
              const connection = levelData.connections.find(
                (c) => c.from === i && c.to === i + 1
              );
              const placedCompId = placements[slot.id];
              const comp = placedCompId
                ? levelData.components.find((c) => c.id === placedCompId)
                : null;

              return (
                <div key={slot.id}>
                  <ArchitectureSlot
                    slot={slot}
                    index={i}
                    placement={placedCompId}
                    component={comp}
                    isError={errorSlot === slot.id}
                    isDragOver={dragOverSlot === slot.id}
                    hasSelection={!!selectedComponent && !placements[slot.id]}
                    onClick={() => handleSlotClick(slot.id)}
                    onDragOver={(e) => handleDragOver(e, slot.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, slot.id)}
                    hint={slot.hint}
                  />
                  {i < levelData.slots.length - 1 && (
                    <FlowArrow connection={connection} />
                  )}
                </div>
              );
            })}
          </div>

          {levelData.branches?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-surface-border/50">
              <h5 className="text-[9px] font-mono text-text-muted uppercase tracking-wider mb-1.5">
                Additional Architecture Notes
              </h5>
              <div className="space-y-1">
                {levelData.branches.map((b, i) => (
                  <p key={i} className="text-[10px] text-text-muted/70 flex items-start gap-1.5 leading-relaxed">
                    <GitBranch size={10} className="mt-0.5 shrink-0 text-accent/30" />
                    <span>{b}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showCompletion && (
          <LevelCompletionPanel
            level={levelData}
            attempts={attempts}
            isLastLevel={currentLevelIndex === levels.length - 1}
            allComplete={completedLevels.length === levels.length}
            onContinue={continueToNext}
            onReview={() => setShowCompletion(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
