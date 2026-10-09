import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { experience } from "../data/portfolio";

function TimelineItem({ exp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-surface-border" />

      <div
        className={`absolute left-0 top-1.5 w-3 h-3 rounded-full -translate-x-[5.5px] border-2 ${
          exp.isCurrent
            ? "bg-accent border-accent shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            : "bg-surface-card border-surface-border"
        }`}
      />

      <div className="bg-surface-card border border-surface-border rounded-xl p-6 hover:border-accent/20 transition-colors duration-250">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              {exp.role}
            </h3>
            <p className="text-text-secondary text-sm">{exp.company}</p>
          </div>
          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${
              exp.isCurrent
                ? "text-accent border-accent/30 bg-accent/5"
                : "text-text-muted border-surface-border"
            }`}
          >
            {exp.period}
          </span>
        </div>

        <ul className="space-y-2 mb-4">
          {exp.achievements.map((a, i) => (
            <li key={i} className="text-text-secondary text-sm flex gap-2">
              <span className="text-accent mt-1 flex-shrink-0">▸</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-0.5 rounded bg-surface-light text-text-muted border border-surface-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Experience"
          subtitle="Professional journey in backend engineering and technical leadership"
        />

        <div className="ml-4">
          {experience.map((exp, i) => (
            <TimelineItem key={exp.period} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
