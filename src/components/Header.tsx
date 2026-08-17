import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/about", label: "About" },
  { to: "/rooms", label: "Rooms" },
  { to: "/spa", label: "Pool and Grounds" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-10 py-4 bg-[oklch(0.18_0.005_270/0.98)] border-b border-border shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
      <Link to="/" className="font-display text-xl tracking-[0.12em] text-gold font-light" onClick={() => setOpen(false)}>
        COSY <span className="italic text-foreground">Corner</span>
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              activeProps={{ className: "text-gold" }}
              className="text-foreground text-[0.65rem] tracking-[0.2em] uppercase hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <Link to="/booking" className="btn-primary !py-[0.65rem] !px-6 hidden sm:inline-block">
          Book Now
        </Link>
        <button
          className="md:hidden text-gold text-2xl leading-none w-8 h-8 flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-[oklch(0.18_0.005_270/0.99)] flex flex-col items-center justify-center gap-6 z-[999]">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-foreground text-sm tracking-[0.3em] uppercase hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/booking" onClick={() => setOpen(false)} className="btn-primary mt-4">Book Now</Link>
        </div>
      )}
    </nav>
  );
}
