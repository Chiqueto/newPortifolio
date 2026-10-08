"use client";

import React from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { MapPin, GraduationCap, Briefcase, Award, ArrowUpRight } from "lucide-react";

interface AboutSceneProps {
  profile?: any;
  education?: any[];
}

export function AboutScene({ profile, education = [] }: AboutSceneProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const bioParagraphs = profile?.bio
    ? profile.bio.split("\n\n").filter(Boolean)
    : [];

  return (
    <section 
      id="scene-about" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 sm:py-24"
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Scenic Card Container with subtle mountain/forest gradient background */}
        <div className="relative rounded-[32px] sm:rounded-[44px] bg-gradient-to-b from-[#280625] via-[#350A30] to-[#1D031A] border border-[#F59879]/30 p-6 sm:p-10 md:p-14 shadow-[0_25px_80px_rgba(20,2,19,0.35)] overflow-hidden">
          
          {/* Subtle Vector Landscape Backdrop Elements */}
          <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-20 h-48 overflow-hidden">
            <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full fill-[#F59879]">
              <path d="M0 140 L30 110 L60 135 L90 95 L130 140 L180 85 L220 130 L280 70 L340 135 L400 90 L460 130 L520 80 L580 125 L650 75 L710 130 L780 85 L840 135 L910 90 L980 130 L1050 80 L1120 125 L1200 90 L1200 200 L0 200 Z" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ── Left Column: Illustrated Avatar Medallion & Quick Credentials ── */}
            <motion.div 
              className="lg:col-span-5 flex flex-col items-center text-center"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Profile Avatar Frame with warm sun ring */}
              <div className="relative group">
                {/* Outer Glow Halo */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#D65F67] via-[#F59879] to-[#F9E6C1] opacity-60 blur-md group-hover:opacity-85 transition-opacity duration-500" />
                
                {/* Medallion Border */}
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-[#22051F] border-2 border-[#F9E6C1]/80 shadow-2xl overflow-hidden">
                  <div className="w-full h-full rounded-full overflow-hidden relative bg-[#4A1739]">
                    <Image
                      src={profile?.avatar_url || "/profile_pic_cartoon.png"}
                      alt={profile?.name || "Luís Felipe Chiqueto"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Seal Badge */}
                <div className="absolute -bottom-2 right-2 sm:right-4 px-3 py-1 rounded-full bg-[#F59879] text-[#22051F] font-bold text-[11px] font-mono shadow-lg border border-[#F9E6C1] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>DEV JR</span>
                </div>
              </div>

              {/* Identity & Location */}
              <div className="mt-6 space-y-1">
                <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                  {profile?.name || "Luís Felipe Mozer Chiqueto"}
                </h3>
                <p className="font-mono text-sm text-[#F59879] font-medium">
                  {profile?.headline || "Web | Mobile Developer"}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#F9E6C1]/70 pt-1 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#F59879]" />
                  <span>{profile?.location || "São Joaquim da Barra, SP"}</span>
                </div>
              </div>

              {/* Education Highlights Badges */}
              <div className="w-full mt-6 pt-6 border-t border-[#F59879]/20 space-y-2.5 text-left">
                <p className="font-mono text-[11px] text-[#F9E6C1]/60 uppercase tracking-widest font-semibold text-center mb-3">
                  Formação Acadêmica
                </p>
                {education.slice(0, 3).map((edu) => (
                  <div 
                    key={edu.id} 
                    className="p-2.5 rounded-xl bg-[#22051F]/60 border border-[#F59879]/20 flex items-start gap-2.5"
                  >
                    <GraduationCap className="w-4 h-4 text-[#F59879] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {edu.course}
                      </p>
                      <p className="text-[11px] text-[#F9E6C1]/70">
                        {edu.institution} · {edu.degree}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right Column: Narrative & Technical Focus ── */}
            <motion.div 
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {/* Scene Section Tag */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#F59879] font-bold px-2 py-0.5 rounded bg-[#4A1739] border border-[#F59879]/40">
                  CENA 02
                </span>
                <span className="font-mono text-xs text-[#F9E6C1]/70 uppercase tracking-widest">
                  Sobre Mim & Visão
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                Construindo experiências digitais sólidas da arquitetura à interface.
              </h2>

              {/* Bio Content */}
              <div className="space-y-4 text-sm sm:text-base text-[#F9E6C1]/90 leading-relaxed font-sans">
                {bioParagraphs.length > 0 ? (
                  bioParagraphs.map((paragraph: string, idx: number) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <p>
                    Sou desenvolvedor de software focado em sistemas corporativos de alta demanda,
                    desenvolvimento web com React e Next.js, mobile com React Native e backend robusto com Java e Spring Boot.
                  </p>
                )}
              </div>

              {/* Quick Feature Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-[#22051F]/70 border border-[#F59879]/30">
                  <div className="flex items-center gap-2 text-[#F59879] font-semibold text-xs font-mono mb-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Sistemas Corporativos</span>
                  </div>
                  <p className="text-xs text-[#F9E6C1]/80">
                    Experiência prática na Usina Alta Mogiana com regras de negócio críticas em Delphi e banco de dados Oracle.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#22051F]/70 border border-[#F59879]/30">
                  <div className="flex items-center gap-2 text-[#F59879] font-semibold text-xs font-mono mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Engenharia & Produtos</span>
                  </div>
                  <p className="text-xs text-[#F9E6C1]/80">
                    Graduando em Engenharia de Software pela UNIFACEF, integrando IA, pagamentos, geolocalização e Wear OS.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {profile?.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F59879] hover:bg-[#F9E6C1] text-[#22051F] font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <span>Currículo Completo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                <a
                  href="#scene-contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22051F] hover:bg-[#4A1739] text-[#F9E6C1] hover:text-white font-medium text-xs sm:text-sm border border-[#F59879]/40 transition-colors"
                >
                  <span>Vamos conversar</span>
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
