import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";
import { stats } from "../data/portfolio";

function AnimatedStat({ value, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const numericMatch = value.match(/^(\d+)/);
    if (!numericMatch) {
      setDisplayed(value);
      return;
    }
    const target = parseInt(numericMatch[1], 10);
    const suffix = value.slice(numericMatch[1].length);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setDisplayed(`${current}${suffix}`);
    }, 30);
    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-surface-card border border-surface-border rounded-xl p-5 text-center hover:border-accent/30 transition-colors duration-250"
    >
      <div className="text-2xl md:text-3xl font-bold text-accent font-mono mb-1">
        {displayed}
      </div>
      <div className="text-text-secondary text-sm">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <SectionHeading title="Impact & Highlights" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto text-center mb-12 leading-relaxed"
      >
        Over 8+ years, I've focused on building high-performance backend
        systems, designing scalable microservices, optimizing API performance,
        and leading engineering teams across fintech and edtech domains.
        From Redis caching and RabbitMQ-based async workflows to AWS
        infrastructure and system design — I deliver measurable results.
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </div>
  );
}
