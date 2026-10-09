import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle, XCircle } from "lucide-react";
import Button from "./Button";

const QUESTIONS = [
  {
    scenario: "A user requests a resource that does not exist.",
    answer: 404,
    options: [200, 201, 404, 500],
    explanation:
      "404 Not Found indicates the server cannot find the requested resource.",
  },
  {
    scenario: "A new user account is successfully created via a POST request.",
    answer: 201,
    options: [200, 201, 204, 301],
    explanation:
      "201 Created indicates that the request has been fulfilled and a new resource has been created.",
  },
  {
    scenario:
      "A client sends a request with an invalid JSON body that the server cannot parse.",
    answer: 400,
    options: [400, 401, 404, 422],
    explanation:
      "400 Bad Request means the server cannot process the request due to a client error like malformed syntax.",
  },
  {
    scenario:
      "A user tries to access an admin endpoint without proper authentication.",
    answer: 401,
    options: [400, 401, 403, 404],
    explanation:
      "401 Unauthorized means the request lacks valid authentication credentials.",
  },
  {
    scenario:
      "An authenticated user tries to delete another user's data but doesn't have permission.",
    answer: 403,
    options: [401, 403, 404, 500],
    explanation:
      "403 Forbidden means the server understood the request but refuses to authorize it.",
  },
  {
    scenario: "The server successfully processes a DELETE request with no content to return.",
    answer: 204,
    options: [200, 201, 204, 404],
    explanation:
      "204 No Content indicates the server successfully processed the request but returns no content.",
  },
  {
    scenario:
      "The server encounters an unexpected condition preventing it from fulfilling the request.",
    answer: 500,
    options: [400, 404, 500, 503],
    explanation:
      "500 Internal Server Error indicates an unexpected server-side failure.",
  },
  {
    scenario:
      "Too many requests are being sent by the client in a given time frame.",
    answer: 429,
    options: [400, 403, 429, 503],
    explanation:
      "429 Too Many Requests means the user has sent too many requests in a given amount of time (rate limiting).",
  },
];

export default function HttpStatusGame({ onClose }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];

  const handleSelect = (code) => {
    if (selected !== null) return;
    setSelected(code);
    if (code === question.answer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl font-bold text-accent font-mono mb-2">
          {score}/{QUESTIONS.length}
        </div>
        <p className="text-text-secondary mb-1 text-lg">
          {score === QUESTIONS.length
            ? "HTTP expert! Flawless knowledge."
            : score >= 5
            ? "Great API knowledge!"
            : "Time to review your HTTP status codes!"}
        </p>
        <p className="text-text-muted text-sm mb-6">HTTP Status Challenge</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={handleRestart}>
            <RotateCcw size={14} />
            Play Again
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs font-mono text-text-muted">
          Question {currentQ + 1}/{QUESTIONS.length}
        </span>
        <span className="text-xs font-mono text-accent">Score: {score}</span>
      </div>

      <p className="text-text-primary text-base mb-6 leading-relaxed">
        {question.scenario}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <AnimatePresence mode="wait">
          {question.options.map((code) => {
            let style =
              "border-surface-border bg-surface-light text-text-secondary hover:border-accent/40 hover:text-text-primary";
            if (selected !== null) {
              if (code === question.answer) {
                style =
                  "border-green-500/50 bg-green-500/10 text-green-400";
              } else if (code === selected && code !== question.answer) {
                style = "border-red-500/50 bg-red-500/10 text-red-400";
              } else {
                style =
                  "border-surface-border bg-surface-light text-text-muted opacity-50";
              }
            }

            return (
              <motion.button
                key={code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => handleSelect(code)}
                disabled={selected !== null}
                className={`px-4 py-3 rounded-lg border text-center font-mono text-lg transition-all duration-200 flex items-center justify-center gap-2 ${style} ${
                  selected === null ? "cursor-pointer" : "cursor-default"
                }`}
              >
                {code}
                {selected !== null && code === question.answer && (
                  <CheckCircle size={16} className="text-green-400" />
                )}
                {selected !== null &&
                  code === selected &&
                  code !== question.answer && (
                    <XCircle size={16} className="text-red-400" />
                  )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {selected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-text-muted text-sm mb-4 px-2">
            {question.explanation}
          </p>
          <Button onClick={handleNext} variant="accent">
            {currentQ + 1 >= QUESTIONS.length ? "See Results" : "Next Question"}
          </Button>
        </motion.div>
      )}
    </div>
  );
}
