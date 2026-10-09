export default function Button({
  children,
  href,
  download,
  onClick,
  variant = "default",
  className = "",
  external,
  ...props
}) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-250 border focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

  const variants = {
    default:
      "border-surface-border bg-surface-card text-text-primary hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]",
    accent:
      "border-accent bg-accent/10 text-accent hover:bg-accent hover:text-surface hover:shadow-[0_0_24px_rgba(34,211,238,0.2)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
