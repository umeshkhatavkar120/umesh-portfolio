import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { contactInfo } from "../data/portfolio";

function LinkedinIcon({ size = 22, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 22, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const cards = [
  {
    key: "phone",
    icon: Phone,
    label: "Phone",
    getValue: () => contactInfo.phone || "+91-9769942049",
    getHref: () => `tel:+91-9769942049`,
  },
  {
    key: "email",
    icon: Mail,
    label: "Email",
    getValue: () => contactInfo.email || "manishkhatavkar120@gmail.com",
    getHref: () => `mailto:manishkhatavkar120@gmail.com`
  },
  {
    key: "linkedin",
    icon: LinkedinIcon,
    label: "LinkedIn",
    getValue: () =>
      contactInfo.linkedin
        ? contactInfo.linkedin.replace(/^https?:\/\/(www\.)?/, "")
        : "umesh-khatavkar",
    getHref: () => "https://www.linkedin.com/in/umesh-khatavkar-709932a0",
    external: true,
  },
  {
    key: "github",
    icon: GithubIcon,
    label: "GitHub",
    getValue: () =>
      contactInfo.github
        ? contactInfo.github.replace(/^https?:\/\/(www\.)?/, "")
        : "umeshkhatavkar120",
    getHref: () => `https://github.com/umeshkhatavkar120`,
    external: true,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading title="Let's build something scalable." />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto text-center mb-12 leading-relaxed"
        >
          Interested in backend engineering, system design, or technical
          leadership collaboration? Let's connect and build performant,
          scalable solutions together.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cards.map((card, i) => {
            const href = card.getHref();
            const Tag = href ? "a" : "div";

            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Tag
                  {...(href
                    ? {
                        href,
                        target: card.external ? "_blank" : undefined,
                        rel: card.external
                          ? "noopener noreferrer"
                          : undefined,
                      }
                    : {})}
                  className="block bg-surface-card border border-surface-border rounded-xl p-5 text-center hover:border-accent/30 transition-all duration-250 group"
                >
                  <card.icon
                    size={22}
                    className="mx-auto mb-3 text-text-muted group-hover:text-accent transition-colors duration-250"
                  />
                  <div className="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">
                    {card.label}
                  </div>
                  <div className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-250 break-all">
                    {card.getValue()}
                  </div>
                </Tag>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
