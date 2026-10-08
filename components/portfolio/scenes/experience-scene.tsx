"use client";

import React from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

interface ExperienceSceneProps {
  experiences: any[];
}

const DEFAULT_COMPANY_LOGOS: Record<string, string> = {
  "Usina Alta Mogiana": "/AltaMogiana.png",
  "ACEDATA Software": "/Acedata.png",
  "ACEDATA": "/Acedata.png",
};

export function ExperienceScene({ experiences = [] }: ExperienceSceneProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const formatDatePeriod = (exp: any) => {
    if (exp.current) return "2026 — PRESENTE · ATUAL";
    if (exp.start_date && exp.end_date) {
      const start = new Date(exp.start_date).getFullYear();
      const end = new Date(exp.end_date).getFullYear();
      return `${start} — ${end}`;
    }
    return "";
  };

  return (
    <section 
      id="scene-experience" 
      ref={ref}
      className="relative min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-24"
    >
      <div className="w-full max-w-5xl mx-auto space-y-12">
        
        {/* ── Scene Header ── */}
        <div className="pb-4 border-b border-[#F59879]/20">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-[#F59879] font-bold px-2.5 py-0.5 rounded-full bg-[#4A1739]/80 border border-[#F59879]/40">
              04
            </span>
            <span className="font-mono text-xs text-[#F9E6C1]/75 uppercase tracking-widest font-semibold">
              Trajetória & Carreira
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Experiência Profissional
          </h2>
          <p className="text-sm text-[#F9E6C1]/80 max-w-xl mt-1">
            Atuação em desenvolvimento corporativo, sistemas ERP e indústria sucroalcooleira.
          </p>
        </div>

        {/* ── Visual Journey / Mountain Trail Timeline ── */}
        <div className="relative pl-6 sm:pl-10 space-y-8 sm:space-y-12">
          
          {/* Vertical scenic glowing trail line */}
          <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#F59879] via-[#D65F67] to-[#4A1739]" />

          {experiences.map((exp, index) => {
            const logo =
              exp.company_logo_url ||
              DEFAULT_COMPANY_LOGOS[exp.company] ||
              "/AltaMogiana.png";

            const lines = exp.description
              ? exp.description
                  .split("\n")
                  .map((l: string) => l.trim())
                  .filter(Boolean)
              : [];

            return (
              <motion.div
                key={exp.id || index}
                initial={{ opacity: 0, x: -25 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                {/* Milestone Node on Trail */}
                <div className="absolute -left-[30px] sm:-left-[42px] top-6 w-5 h-5 rounded-full bg-[#22051F] border-2 border-[#F59879] flex items-center justify-center shadow-[0_0_12px_rgba(245,152,121,0.6)] group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#F9E6C1]" />
                </div>

                {/* Experience Card */}
                <div className="rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#280624] to-[#1C031A] border border-[#F59879]/30 hover:border-[#F59879] p-6 sm:p-8 transition-all duration-300 shadow-[0_15px_45px_rgba(20,2,19,0.3)]">
                  
                  {/* Card Header with Logo, Role, Company & Dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F59879]/20">
                    <div className="flex items-center gap-4">
                      {/* Logo Medallion */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-2 shrink-0 flex items-center justify-center shadow-md overflow-hidden">
                        <Image
                          src={logo}
                          alt={exp.company}
                          width={48}
                          height={48}
                          className="object-contain max-h-full"
                        />
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-[#F9E6C1] transition-colors">
                          {exp.role}
                        </h3>
                        <p className="font-mono text-sm text-[#F59879] font-medium">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Period pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22051F] border border-[#F59879]/30 text-xs font-mono text-[#F9E6C1] shrink-0 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-[#F59879]" />
                      <span>{formatDatePeriod(exp)}</span>
                    </div>
                  </div>

                  {/* Bullet Points / Detailed Description */}
                  <div className="pt-5 space-y-2.5">
                    {lines.map((line: string, lIdx: number) => {
                      const cleanLine = line.replace(/^[•\-\*]\s*/, "");
                      return (
                        <div key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F9E6C1]/90 leading-relaxed font-sans">
                          <CheckCircle2 className="w-4 h-4 text-[#F59879] shrink-0 mt-0.5" />
                          <span>{cleanLine}</span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
