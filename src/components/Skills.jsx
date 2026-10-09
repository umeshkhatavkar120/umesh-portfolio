import { motion } from "framer-motion";
import {
  Server,
  Network,
  Database,
  Cloud,
  BrainCircuit,
  Wrench,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skills } from "../data/portfolio";

const categoryIcons = {
  Backend: Server,
  Architecture: Network,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  "AI & ML": BrainCircuit,
  Tools: Wrench,
};

function SkillCard({ group, index }) {
  const Icon = categoryIcons[group.category] || Server;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-surface-card border border-surface-border rounded-xl p-5 hover:border-accent/20 transition-colors duration-250"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon size={18} className="text-accent" />
        <h3 className="text-sm font-semibold text-text-primary tracking-wide uppercase">
          {group.category}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <span
            key={skill}
            className="text-xs font-mono px-3 py-1.5 rounded-full bg-surface-light border border-surface-border text-text-secondary hover:border-accent/40 hover:text-accent hover:shadow-[0_0_12px_rgba(34,211,238,0.08)] transition-all duration-250 cursor-default select-none"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
