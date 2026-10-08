"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Landscape } from "../landscape/landscape";
import { SceneNavigator } from "../navigation/scene-navigator";
import { ArrowDown, Mountain, Sparkles } from "lucide-react";

interface OpeningSceneProps {
  profile?: any;
}

export function OpeningScene({ profile }: OpeningSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  const scrollToProjects = () => {
    const el = document.getElementById("scene-projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="scene-opening" 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-10 sm:py-16 overflow-visible"
    >
      <div className="w-full max-w-6xl mx-auto">
        <Landscape>
          {/* ── Top Bar inside the Framed Poster ── */}
          <div className="flex items-center justify-between w-full">
            {/* Top-Left Monogram / Mountain Emblem */}
            <motion.div
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#22051F]/40 backdrop-blur-md border border-[#F59879]/30 text-[#F9E6C1]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Mountain className="w-4 h-4 text-[#F59879]" />
              <span className="font-mono text-xs tracking-wider font-semibold uppercase">
                LC · 2026
              </span>
            </motion.div>

            {/* Top-Right: 4-Square Scene Navigator */}
            <SceneNavigator 
              resumeUrl={profile?.resume_url} 
              activeScene="scene-opening" 
            />
          </div>

          {/* ── Center Hero Typography (Poster Focal Point) ── */}
          <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-4 sm:py-8">
            {/* Small eyebrow category tag */}
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22051F]/60 backdrop-blur-md border border-[#F59879]/40 text-[#F9E6C1] text-xs sm:text-sm font-medium mb-3 sm:mb-4 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59879]" />
              <span className="tracking-wide">
                {profile?.name ? profile.name.toUpperCase() : "LUÍS FELIPE MOZER CHIQUETO"}
              </span>
            </motion.div>

            {/* Main Display Headline (Big, Bold, Clean Sans) */}
            <motion.h1
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.95] drop-shadow-[0_4px_18px_rgba(34,5,31,0.5)] max-w-4xl"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              SOFTWARE <br className="hidden sm:inline" />
              DEVELOPER
            </motion.h1>

            {/* Specialization & Stack Subtitle */}
            <motion.div
              className="mt-3 sm:mt-5 flex flex-col items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
            >
              <p className="font-mono text-xs sm:text-sm md:text-base font-semibold text-[#F9E6C1] tracking-wide drop-shadow-md">
                Backend · Web · Mobile
              </p>
              <p className="text-[11px] sm:text-xs text-[#FFF]/80 tracking-wider font-mono">
                Java / Spring Boot · React / Next.js · React Native · Delphi / Oracle
              </p>
            </motion.div>

            {/* Call to Action Button */}
            <motion.div
              className="mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <button
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#F59879] hover:bg-[#F9E6C1] text-[#22051F] font-semibold text-xs sm:text-sm shadow-[0_8px_25px_rgba(245,152,121,0.4)] hover:shadow-[0_10px_30px_rgba(249,230,193,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explorar Projetos</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* ── Bottom Bar: Social Links & Exploration Cue ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs font-mono text-[#F9E6C1]/80">
            <div className="hidden sm:flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59879] animate-pulse" />
              <span className="text-[11px] text-[#F9E6C1]/70">
                {profile?.location || "São Joaquim da Barra, SP"}
              </span>
            </div>

            {/* Social Links lowercase */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-xs">
              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  github
                </a>
              )}
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  linkedin
                </a>
              )}
              {profile?.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  instagram
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="hover:text-white transition-colors"
                >
                  email
                </a>
              )}
              {profile?.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F59879] hover:text-white font-bold transition-colors"
                >
                  currículo
                </a>
              )}
            </div>
          </div>
        </Landscape>
      </div>
    </section>
  );
}
