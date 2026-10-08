"use client";

import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { 
  Mail, 
  Github, 
  Linkedin, 
  Instagram, 
  FileText, 
  Copy, 
  Check, 
  ArrowUp,
  MapPin,
  Sparkles
} from "lucide-react";

interface ContactSceneProps {
  profile?: any;
}

export function ContactScene({ profile }: ContactSceneProps) {
  const [copied, setCopied] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const email = profile?.email || "lfchiqueto@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    const el = document.getElementById("scene-opening");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="scene-contact" 
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between px-4 sm:px-6 md:px-12 pt-16 pb-12 sm:pt-24 overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto my-auto space-y-12">
        
        {/* ── Dusk Framed Card ── */}
        <div className="relative rounded-[32px] sm:rounded-[44px] bg-gradient-to-b from-[#1E031B] via-[#2A0726] to-[#140213] border border-[#F59879]/30 p-8 sm:p-12 md:p-16 shadow-[0_25px_80px_rgba(0,0,0,0.5)] overflow-hidden text-center">
          
          {/* Subtle starry background dots */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute top-10 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse" />
            <div className="absolute top-20 right-1/3 w-1.5 h-1.5 rounded-full bg-[#FFF3D6] animate-pulse" />
            <div className="absolute top-36 left-1/3 w-1 h-1 rounded-full bg-[#F59879]" />
            <div className="absolute top-28 right-1/4 w-1 h-1 rounded-full bg-white" />
            <div className="absolute top-14 right-16 w-1 h-1 rounded-full bg-[#F9E6C1]" />
          </div>

          {/* Silhouette Forest Horizon at Bottom of Card */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-30 h-32 overflow-hidden">
            <svg viewBox="0 0 1200 150" preserveAspectRatio="none" className="w-full h-full fill-[#0E010D]">
              <path d="M0 80 L20 40 L35 75 L50 30 L65 70 L90 20 L115 65 L145 35 L175 75 L210 25 L245 70 L285 40 L320 80 L360 30 L400 75 L450 20 L500 70 L550 35 L600 75 L650 25 L700 70 L750 40 L800 80 L850 30 L900 75 L950 20 L1000 65 L1050 35 L1100 75 L1150 25 L1200 60 L1200 150 L0 150 Z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Header Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#22051F] border border-[#F59879]/40 text-[#F59879] text-xs font-mono font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>06 · CONTATO & CONEXÃO</span>
            </motion.div>

            {/* Headline */}
            <motion.h2 
              className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Vamos construir o próximo projeto juntos?
            </motion.h2>

            <motion.p 
              className="text-sm sm:text-base text-[#F9E6C1]/85 font-sans leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Estou sempre aberto a novos desafios de engenharia, posições de desenvolvimento
              e colaborações em produtos inovadores.
            </motion.p>

            {/* Email Copy Card */}
            <motion.div 
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-[#22051F] border border-[#F59879]/40 text-white font-mono text-sm shadow-md">
                <Mail className="w-4 h-4 text-[#F59879]" />
                <span>{email}</span>
              </div>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F59879] hover:bg-[#F9E6C1] text-[#22051F] font-bold text-xs font-mono transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-800" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar E-mail</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Social Links Row */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-3 pt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
            >
              {profile?.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22051F]/80 hover:bg-[#4A1739] border border-[#F59879]/30 text-[#F9E6C1] hover:text-white text-xs font-mono transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#F59879]" />
                  <span>LinkedIn</span>
                </a>
              )}

              {profile?.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22051F]/80 hover:bg-[#4A1739] border border-[#F59879]/30 text-[#F9E6C1] hover:text-white text-xs font-mono transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-[#F59879]" />
                  <span>GitHub</span>
                </a>
              )}

              {profile?.instagram_url && (
                <a
                  href={profile.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22051F]/80 hover:bg-[#4A1739] border border-[#F59879]/30 text-[#F9E6C1] hover:text-white text-xs font-mono transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#F59879]" />
                  <span>Instagram</span>
                </a>
              )}

              {profile?.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22051F]/80 hover:bg-[#4A1739] border border-[#F59879]/30 text-[#F9E6C1] hover:text-white text-xs font-mono transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#F59879]" />
                  <span>Currículo</span>
                </a>
              )}
            </motion.div>

          </div>
        </div>

      </div>

      {/* ── Bottom Ambient Footer ── */}
      <footer className="w-full max-w-5xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#F59879]/15 text-xs font-mono text-[#F9E6C1]/70">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#F59879]" />
          <span>{profile?.location || "São Joaquim da Barra, SP"} · Brasil</span>
        </div>

        <p>© {new Date().getFullYear()} · Luís Felipe Mozer Chiqueto</p>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
        >
          <span>Retornar ao Início</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#F59879]" />
        </button>
      </footer>
    </section>
  );
}
