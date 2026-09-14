"use client";

import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaFileArrowDown } from "react-icons/fa6";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import { useTab } from "@/hooks/useTab";

const NAV_ITEMS = [
  { id: "home",       label: "Sobre",        index: "01" },
  { id: "projects",   label: "Projetos",     index: "02" },
  { id: "experience", label: "Experiência",  index: "03" },
  { id: "skills",     label: "Stack",        index: "04" },
  { id: "contact",    label: "Contato",      index: "05" },
];

function SidebarContent({ profile, onNavigate }: { profile?: any; onNavigate?: () => void }) {
  const { selectedTab, setSelectedTab } = useTab();

  const handleNav = (id: string) => {
    setSelectedTab(id);
    onNavigate?.();
  };

  return (
    <div className="flex flex-col h-full bg-surface border-r border-border">
      {/* ── Identidade ── */}
      <div className="px-6 pt-8 pb-6">
        {/* Monograma */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded border-2 border-gold bg-gold-muted flex items-center justify-center shrink-0">
            <span className="font-mono font-bold text-gold text-base leading-none">LF</span>
          </div>
          <div>
            <p className="text-xs font-mono text-gold uppercase tracking-[0.15em] leading-none mb-0.5">
              Software Developer
            </p>
            <h1 className="text-sm font-bold text-foreground leading-tight">
              {profile?.name?.split(" ").slice(0, 2).join(" ") || "Luís Felipe"}
            </h1>
          </div>
        </div>

        {/* Bio curta */}
        {profile?.bio && (
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {profile.bio}
          </p>
        )}
      </div>

      <div className="mx-6 border-t border-border" />

      {/* ── Navegação ── */}
      <nav className="flex-1 px-3 py-5">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = selectedTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded text-left
                    transition-all duration-150 group relative
                    ${isActive
                      ? "bg-gold-muted text-gold"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }
                  `}
                >
                  {/* Barra ativa dourada */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gold rounded-r" />
                  )}

                  <span className={`
                    font-mono text-xs transition-colors
                    ${isActive ? "text-gold" : "text-border group-hover:text-muted-foreground"}
                  `}>
                    {item.index}
                  </span>

                  <span className="text-sm font-medium tracking-wide">{item.label}</span>

                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mx-6 border-t border-border" />

      {/* ── Status ── */}
      <div className="px-6 py-5 space-y-4">
        <div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
            Atualmente
          </p>
          <p className="text-sm font-medium text-foreground">Usina Alta Mogiana</p>
          {profile?.location && (
            <p className="text-xs text-muted-foreground mt-0.5">{profile.location}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-xs font-mono text-gold">Disponível para oportunidades</span>
        </div>
      </div>

      <div className="mx-6 border-t border-border" />

      {/* ── Links ── */}
      <div className="px-6 py-5 flex items-center gap-4">
        {profile?.github_url && (
          <Link href={profile.github_url} target="_blank" aria-label="GitHub"
            className="text-muted-foreground hover:text-gold transition-colors">
            <FaGithub size={18} />
          </Link>
        )}
        {profile?.linkedin_url && (
          <Link href={profile.linkedin_url} target="_blank" aria-label="LinkedIn"
            className="text-muted-foreground hover:text-gold transition-colors">
            <FaLinkedin size={18} />
          </Link>
        )}
        {profile?.resume_url && (
          <a href={profile.resume_url} target="_blank" download aria-label="Currículo"
            className="text-muted-foreground hover:text-gold transition-colors ml-auto">
            <FaFileArrowDown size={18} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Sidebar({ profile }: { profile?: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:block w-[300px] shrink-0 h-screen sticky top-0">
        <SidebarContent profile={profile} />
      </aside>

      {/* ── Mobile Header ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-surface border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-gold bg-gold-muted flex items-center justify-center">
            <span className="font-mono font-bold text-gold text-xs">LF</span>
          </div>
          <div>
            <p className="text-xs font-mono text-gold uppercase tracking-wider leading-none">Dev</p>
            <p className="text-sm font-bold text-foreground leading-tight">Luís Felipe</p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-muted-foreground hover:text-gold transition-colors p-1"
          aria-label="Menu"
        >
          {mobileOpen ? <HiX size={22} /> : <HiMenuAlt2 size={22} />}
        </button>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="md:hidden fixed top-[53px] left-0 bottom-0 z-50 w-[280px] shadow-2xl">
            <SidebarContent profile={profile} onNavigate={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  );
}
