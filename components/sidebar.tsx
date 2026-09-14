"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";

const NAV_ITEMS = [
  { id: "overview",     label: "Overview",      index: "01" },
  { id: "projects",     label: "Projetos",      index: "02" },
  { id: "experience",   label: "Experiência",   index: "03" },
  { id: "capabilities", label: "Capacidades",   index: "04" },
  { id: "contact",      label: "Contato",       index: "05" },
];

export default function Sidebar({ profile }: { profile?: any }) {
  const [active, setActive] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const name = profile?.name || "Luís Felipe Chiqueto";
  const headline = profile?.headline || "Software Developer";
  const github = profile?.github_url;
  const linkedin = profile?.linkedin_url;
  const currentJob = "Usina Alta Mogiana";

  return (
    <>
      {/* ── Mobile Header ── */}
      <header className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur border-b border-border">
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">{name.split(" ").slice(0, 2).join(" ")}</p>
          <p className="text-xs text-gold font-mono uppercase tracking-wider">{headline}</p>
        </div>
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Menu"
        >
          {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </header>

      {/* ── Mobile Dropdown Nav ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[49px] z-40 bg-background border-b border-border">
          <nav className="px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`w-full flex items-center gap-3 py-2 text-left transition-colors ${
                  active === item.id ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-mono text-xs">{item.index}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[280px] flex-col justify-between px-8 py-10 border-r border-border bg-background z-40">
        {/* Identity */}
        <div className="space-y-8">
          <div className="space-y-1">
            <p className="font-mono text-xs text-gold uppercase tracking-[0.2em]">Software Developer</p>
            <h1 className="text-xl font-bold text-foreground leading-tight">
              {name.split(" ").slice(0, 2).join(" ")}
              <br />
              <span className="text-muted-foreground font-normal">{name.split(" ").slice(2).join(" ")}</span>
            </h1>
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group w-full flex items-center gap-3 py-2 text-left rounded transition-colors ${
                  active === item.id
                    ? "text-gold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`font-mono text-xs transition-colors ${active === item.id ? "text-gold" : "text-border group-hover:text-muted-foreground"}`}>
                  {item.index}
                </span>
                <span className="text-sm font-medium tracking-wide">{item.label}</span>
                {active === item.id && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-gold" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Context + Links */}
        <div className="space-y-6">
          <div className="space-y-1 text-xs font-mono">
            <p className="text-muted-foreground uppercase tracking-wider">Currently</p>
            <p className="text-foreground">{currentJob}</p>
            {profile?.location && (
              <p className="text-muted-foreground">{profile.location}</p>
            )}
          </div>

          <div className="space-y-1 text-xs font-mono">
            <p className="text-muted-foreground uppercase tracking-wider">Status</p>
            <p className="flex items-center gap-1.5 text-gold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Aberto a oportunidades
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2 border-t border-border">
            {github && (
              <Link href={github} target="_blank" aria-label="GitHub"
                className="text-muted-foreground hover:text-gold transition-colors">
                <FaGithub size={18} />
              </Link>
            )}
            {linkedin && (
              <Link href={linkedin} target="_blank" aria-label="LinkedIn"
                className="text-muted-foreground hover:text-gold transition-colors">
                <FaLinkedin size={18} />
              </Link>
            )}
            {profile?.resume_url && (
              <a href={profile.resume_url} target="_blank" download
                className="ml-auto text-xs font-mono text-muted-foreground hover:text-gold transition-colors tracking-wider uppercase">
                CV ↗
              </a>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
