import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Download, ChevronDown } from "lucide-react";
import Button from "./Button";
import { profile } from "../data/portfolio";

function Typewriter({ words, typingSpeed = 80, deleteSpeed = 40, pauseMs = 2000 }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? current.slice(0, text.length - 1)
              : current.slice(0, text.length + 1)
          );
        },
        isDeleting ? deleteSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, typingSpeed, deleteSpeed, pauseMs]);

  return (
    <span className="text-accent">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function ProfilePhoto() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative flex items-center justify-center"
    >
      <div className="relative">
        <div className="absolute -inset-3 rounded-full bg-accent/5 blur-xl" />
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-surface-border overflow-hidden bg-surface-card shadow-2xl shadow-accent/5">
          {!imgError ? (
            <img
              src={profile.profileImage}
              alt={`${profile.name} — ${profile.title}`}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted text-sm font-mono">
              <span><img src={profile.profileImage} alt="umesh-khatavkar.jpeg" /></span>
            </div>
          )}
        </div>

        {profile.floatingTags.map((tag, i) => {
          const positions = [
            "-top-2 -left-12",
            "-top-2 right-15",
            "-top-4 -right-14",
            "top-1/3 -right-20",
            "bottom-8 -left-16",
            "-bottom-2 right-0",
          ];
          return (
            <motion.span
              key={tag}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.15 }}
              className={`absolute ${positions[i]} hidden lg:block px-2 py-1 text-xs font-mono text-text-muted bg-surface-card border border-surface-border rounded-md`}
            >
              {tag}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center pt-20 pb-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="inline-block text-xs font-mono tracking-widest text-text-muted uppercase mb-4">
              Tech Lead &bull; Senior Backend Engineer
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-4 leading-tight">
              Hi, I'm{" "}
              <span className="text-accent">Umesh Khatavkar</span>
            </h1>

            <div className="text-xl md:text-2xl font-mono mb-6 h-8">
              <Typewriter words={profile.rotatingRoles} />
            </div>

            <p className="text-text-secondary text-base md:text-lg max-w-xl mb-8 leading-relaxed mx-auto lg:mx-0">
              {profile.shortSummary}
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button
                href="#experience"
                variant="accent"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Briefcase size={16} />
                View Experience
              </Button>
              <Button href={profile.resumePath} download>
                <Download size={16} />
                Download Resume
              </Button>
            </div>
          </motion.div>

          <div className="flex-shrink-0">
            <ProfilePhoto />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 flex flex-col items-center text-text-muted text-sm gap-2"
      >
        <span>Scroll to explore</span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
