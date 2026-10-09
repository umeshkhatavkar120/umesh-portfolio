import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import SystemDesignGame from "./SystemDesignGame";
import HttpStatusGame from "./HttpStatusGame";

const games = [
  {
    id: "system-design",
    title: "System Design Simulator",
    description:
      "Design scalable backend architectures and make engineering decisions under constraints.",
    icon: Cpu,
    component: SystemDesignGame,
  },
  {
    id: "http-status",
    title: "HTTP Status Challenge",
    description:
      "Test your knowledge of HTTP status codes and backend API behavior.",
    icon: Globe,
    component: HttpStatusGame,
  },
];

export default function Games() {
  const [activeGame, setActiveGame] = useState(null);

  const ActiveComponent = activeGame
    ? games.find((g) => g.id === activeGame)?.component
    : null;

  return (
    <section id="games" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Tech Playground"
          subtitle="Test your backend engineering knowledge with interactive challenges"
        />

        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {games.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-surface-card border border-surface-border rounded-xl p-6 hover:border-accent/20 transition-colors duration-250"
                >
                  <game.icon size={28} className="text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {game.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-5 leading-relaxed">
                    {game.description}
                  </p>
                  <Button
                    variant="accent"
                    onClick={() => setActiveGame(game.id)}
                  >
                    Play Game
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface-card border border-surface-border rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-border">
                <h3 className="text-lg font-semibold text-text-primary">
                  {games.find((g) => g.id === activeGame)?.title}
                </h3>
                <button
                  onClick={() => setActiveGame(null)}
                  className="text-text-muted hover:text-text-primary transition-colors p-1"
                  aria-label="Close game"
                >
                  <X size={18} />
                </button>
              </div>

              {ActiveComponent && (
                <ActiveComponent onClose={() => setActiveGame(null)} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
