import { Phone, Mail } from "lucide-react";
import { contactInfo } from "../data/portfolio";

function LinkedinIcon({ size = 16, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 16, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const socials = [
  {
    icon: LinkedinIcon,
    href: () => contactInfo.linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    icon: Mail,
    href: () => (contactInfo.email ? `mailto:${contactInfo.email}` : null),
    label: "Email",
  },
  {
    icon: Phone,
    href: () => (contactInfo.phone ? `tel:${contactInfo.phone}` : null),
    label: "Phone",
  },
  {
    icon: GithubIcon,
    href: () => contactInfo.github,
    label: "GitHub",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-border py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-text-primary font-semibold mb-1">
          Umesh Khatavkar
        </div>
        <div className="text-text-muted text-sm mb-5">
          Tech Lead &bull; Senior Backend Engineer
        </div>

        <div className="flex justify-center gap-3 mb-6">
          {socials.map((s) => {
            const href = s.href();
            if (!href) return null;
            return (
              <a
                key={s.label}
                href={href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-surface-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/30 transition-all duration-250"
              >
                <s.icon size={16} />
              </a>
            );
          })}
        </div>

        <div className="text-text-muted text-xs">
          &copy; 2026 Umesh Khatavkar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
