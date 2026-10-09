import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const openRef = useRef(null);
  const slashRef = useRef(null);
  const closeRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const slashXY = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const CW = 9.6;
    const HH = 10;

    const setBrackets = (x, y) => {
      if (openRef.current)
        openRef.current.style.transform = `translate(${x - CW * 1.5}px, ${y - HH}px)`;
      if (closeRef.current)
        closeRef.current.style.transform = `translate(${x + CW * 0.5}px, ${y - HH}px)`;
    };

    const setSlash = (x, y) => {
      if (slashRef.current)
        slashRef.current.style.transform = `translate(${x - CW * 0.5}px, ${y - HH}px)`;
    };

    const show = () =>
      [openRef, slashRef, closeRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "1";
      });

    const hide = () =>
      [openRef, slashRef, closeRef].forEach((r) => {
        if (r.current) r.current.style.opacity = "0";
      });

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setBrackets(e.clientX, e.clientY);
      show();
    };

    const animate = () => {
      slashXY.current.x += (mouse.current.x - slashXY.current.x) * 0.1;
      slashXY.current.y += (mouse.current.y - slashXY.current.y) * 0.1;
      setSlash(slashXY.current.x, slashXY.current.y);
      raf.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const base = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: 700,
    fontSize: "18px",
    color: "#22d3ee",
    lineHeight: "20px",
    opacity: 0,
    willChange: "transform",
    userSelect: "none",
    textShadow: "0 0 10px rgba(34,211,238,0.5), 0 0 20px rgba(34,211,238,0.15)",
  };

  return (
    <>
      <span ref={openRef} style={base} aria-hidden="true">
        {"<"}
      </span>
      <span
        ref={slashRef}
        style={{
          ...base,
          textShadow:
            "0 0 16px rgba(34,211,238,0.7), 0 0 40px rgba(34,211,238,0.2)",
        }}
        aria-hidden="true"
      >
        /
      </span>
      <span ref={closeRef} style={base} aria-hidden="true">
        {">"}
      </span>
    </>
  );
}
