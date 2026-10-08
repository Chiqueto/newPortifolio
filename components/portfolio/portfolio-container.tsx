"use client";

import React, { useState, useEffect } from "react";
import { OpeningScene } from "./scenes/opening-scene";
import { AboutScene } from "./scenes/about-scene";
import { ProjectsScene } from "./scenes/projects-scene";
import { ExperienceScene } from "./scenes/experience-scene";
import { CapabilitiesScene } from "./scenes/capabilities-scene";
import { ContactScene } from "./scenes/contact-scene";
import { SceneNavigator, SCENES } from "./navigation/scene-navigator";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

interface PortfolioContainerProps {
  profile: any;
  projects: any[];
  experiences: any[];
  education: any[];
  technologies: any[];
}

export function PortfolioContainer({
  profile,
  projects,
  experiences,
  education,
  technologies,
}: PortfolioContainerProps) {
  const [activeScene, setActiveScene] = useState("scene-opening");
  const [showFloatingDock, setShowFloatingDock] = useState(false);

  useEffect(() => {
    const sceneElements = SCENES.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveScene(entry.target.id);
            if (entry.target.id !== "scene-opening") {
              setShowFloatingDock(true);
            } else {
              setShowFloatingDock(false);
            }
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sceneElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentSceneMeta =
    SCENES.find((s) => s.id === activeScene) || SCENES[0];

  const scrollToTop = () => {
    const el = document.getElementById("scene-opening");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#FBF4EB] dark:bg-[#150314] text-[#22051F] dark:text-[#F9E6C1] transition-colors duration-500 overflow-x-hidden">
      
      {/* ── Background Subtle Textured Glow ── */}
      <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[radial-gradient(#F59879_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ── Main Scenes Continuum ── */}
      <main className="relative z-10 w-full flex flex-col space-y-12 sm:space-y-16">
        <OpeningScene profile={profile} />
        <AboutScene profile={profile} education={education} />
        <ProjectsScene projects={projects} />
        <ExperienceScene experiences={experiences} />
        <CapabilitiesScene technologies={technologies} />
        <ContactScene profile={profile} />
      </main>

      {/* ── Floating Navigation Dock (Appears when scrolled past hero) ── */}
      <AnimatePresence>
        {showFloatingDock && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl bg-[#22051F]/85 backdrop-blur-md border border-[#F59879]/40 shadow-[0_10px_35px_rgba(0,0,0,0.4)] text-[#F9E6C1]"
          >
            {/* Active Scene Indicator Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#4A1739]/50 border border-[#F59879]/20 font-mono text-xs">
              <span className="text-[#F59879] font-bold">
                {currentSceneMeta.number}
              </span>
              <span className="text-white/80 uppercase tracking-wider font-semibold">
                {currentSceneMeta.title}
              </span>
            </div>

            {/* Quick Scroll To Top Button */}
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao início"
              className="p-2.5 rounded-xl bg-[#4A1739]/50 hover:bg-[#4A1739] border border-[#F59879]/30 text-[#F9E6C1] hover:text-white transition-colors"
            >
              <ArrowUp size={16} />
            </button>

            {/* 4-Square Scene Navigator Trigger */}
            <SceneNavigator
              resumeUrl={profile?.resume_url}
              activeScene={activeScene}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
