"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Compass, 
  Layers, 
  Briefcase, 
  Cpu, 
  Mail, 
  User, 
  FileText,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "next-themes";

export interface SceneItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

export const SCENES: SceneItem[] = [
  {
    id: "scene-opening",
    number: "01",
    title: "Início",
    subtitle: "Pôster Ilustrado & Especialização",
    icon: Compass,
  },
  {
    id: "scene-about",
    number: "02",
    title: "Sobre Mim",
    subtitle: "Perfil, Trajetória e Formação",
    icon: User,
  },
  {
    id: "scene-projects",
    number: "03",
    title: "Projetos",
    subtitle: "Projetos em Destaque & Estudos de Caso",
    icon: Layers,
  },
  {
    id: "scene-experience",
    number: "04",
    title: "Experiência",
    subtitle: "Jornada na Usina Alta Mogiana & ACEDATA",
    icon: Briefcase,
  },
  {
    id: "scene-technologies",
    number: "05",
    title: "Tecnologias",
    subtitle: "Backend, Web, Mobile e Ferramentas",
    icon: Cpu,
  },
  {
    id: "scene-contact",
    number: "06",
    title: "Contato",
    subtitle: "Canais de Comunicação & Currículo",
    icon: Mail,
  },
];

interface SceneNavigatorProps {
  resumeUrl?: string | null;
  activeScene?: string;
}

export function SceneNavigator({ resumeUrl, activeScene = "scene-opening" }: SceneNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut: Esc to close, 1-6 to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (!isOpen && (e.key === "m" || e.key === "M")) {
        setIsOpen((prev) => !prev);
      }
      if (isOpen && ["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (SCENES[index]) {
          scrollToScene(SCENES[index].id);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const scrollToScene = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── The 4-Square Button (As requested in design reference) ── */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir navegador de cenas do portfólio"
        className="group relative flex items-center justify-center p-3 rounded-2xl bg-[#22051F]/40 hover:bg-[#22051F]/80 backdrop-blur-md border border-[#F59879]/40 hover:border-[#F9E6C1] text-[#F9E6C1] transition-all duration-300 shadow-[0_4px_16px_rgba(34,5,31,0.25)] hover:scale-105 active:scale-95"
      >
        {/* 4-square grid icon inspired by reference */}
        <div className="grid grid-cols-2 gap-1.5 w-5 h-5">
          <span className="w-2 h-2 rounded-[2px] bg-[#F9E6C1] group-hover:bg-[#FFF] transition-all duration-300 group-hover:scale-90" />
          <span className="w-2 h-2 rounded-[2px] bg-[#F59879] group-hover:bg-[#FFF] transition-all duration-300 group-hover:scale-110" />
          <span className="w-2 h-2 rounded-[2px] bg-[#D65F67] group-hover:bg-[#FFF] transition-all duration-300 group-hover:scale-110" />
          <span className="w-2 h-2 rounded-[2px] bg-[#F9E6C1] group-hover:bg-[#FFF] transition-all duration-300 group-hover:scale-90" />
        </div>
        <span className="sr-only">Navegação por Cenas</span>
      </button>

      {/* ── Fullscreen Illustrated Scene Navigator Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#160315]/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Modal Card */}
            <motion.div
              className="relative w-full max-w-4xl rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#22051F] via-[#2F082B] to-[#1C031A] border border-[#F59879]/40 p-6 sm:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden text-[#F9E6C1]"
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              {/* Background ambient sunset glow */}
              <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#F59879]/15 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#D65F67]/10 blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F59879]/20">
                <div className="flex items-center gap-3">
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#F59879]" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#F9E6C1]" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D65F67]" />
                    <span className="w-1.5 h-1.5 rounded-[1px] bg-[#F59879]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFDF8]">
                      Menu de Navegação
                    </h2>
                    <p className="text-xs text-[#F59879]/90 font-mono">
                      Selecione uma seção ou pressione 1-6 no teclado
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Theme Switcher Button */}
                  {mounted && (
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      aria-label="Alternar tema"
                      className="p-2.5 rounded-full bg-[#4A1739]/60 hover:bg-[#4A1739] border border-[#F59879]/30 text-[#F9E6C1] transition-colors"
                    >
                      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                  )}

                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Fechar menu"
                    className="p-2.5 rounded-full bg-[#4A1739]/60 hover:bg-[#4A1739] border border-[#F59879]/30 text-[#F9E6C1] hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* 6 Scenes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4 py-6">
                {SCENES.map((scene) => {
                  const Icon = scene.icon;
                  const isActive = activeScene === scene.id;

                  return (
                    <button
                      key={scene.id}
                      onClick={() => scrollToScene(scene.id)}
                      className={`group text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                        isActive
                          ? "bg-[#4A1739]/80 border-[#F59879] shadow-[0_4px_20px_rgba(245,152,121,0.25)]"
                          : "bg-[#2A0726]/60 hover:bg-[#4A1739]/50 border-[#F59879]/20 hover:border-[#F59879]/60"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#F9E6C1] to-[#F59879]" />
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-[#22051F]/80 text-[#F59879] border border-[#F59879]/30">
                          {scene.number}
                        </span>
                        <div className="p-2 rounded-xl bg-[#22051F]/60 text-[#F9E6C1] group-hover:text-[#FFF] group-hover:scale-110 transition-all">
                          <Icon size={18} />
                        </div>
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-[#FFFDF8] group-hover:text-[#F9E6C1] transition-colors">
                        {scene.title}
                      </h3>
                      <p className="text-xs text-[#F9E6C1]/70 line-clamp-1 mt-0.5">
                        {scene.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#F59879]/20 text-xs text-[#F9E6C1]/80 font-mono">
                <span>Luís Felipe Mozer Chiqueto · Portfolio Rebranding</span>
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F59879]/20 hover:bg-[#F59879]/30 border border-[#F59879]/40 text-[#F9E6C1] hover:text-white transition-colors"
                  >
                    <FileText size={13} />
                    <span>Download CV</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
