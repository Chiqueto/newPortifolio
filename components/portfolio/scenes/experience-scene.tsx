"use client";

import React, { useMemo } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { Calendar, CheckCircle2, TrendingUp, Building2 } from "lucide-react";

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

  // Group experiences by company name to create career evolution tracks
  const companyGroups = useMemo(() => {
    const groups: Record<
      string,
      {
        company: string;
        companyLogoUrl: string;
        roles: any[];
        isCurrent: boolean;
        startYear: number;
        endYear: string;
      }
    > = {};
    const orderedKeys: string[] = [];

    experiences.forEach((exp) => {
      const key = exp.company?.trim() || "Empresa";
      const start = exp.start_date ? new Date(exp.start_date).getFullYear() : 2024;
      const isCurr = Boolean(exp.current);
      const end = isCurr
        ? "PRESENTE"
        : exp.end_date
        ? String(new Date(exp.end_date).getFullYear())
        : "PRESENTE";

      if (!groups[key]) {
        groups[key] = {
          company: exp.company,
          companyLogoUrl:
            exp.company_logo_url ||
            DEFAULT_COMPANY_LOGOS[exp.company] ||
            "/AltaMogiana.png",
          roles: [],
          isCurrent: isCurr,
          startYear: start,
          endYear: end,
        };
        orderedKeys.push(key);
      } else {
        if (isCurr) groups[key].isCurrent = true;
        if (start < groups[key].startYear) groups[key].startYear = start;
        if (isCurr) groups[key].endYear = "PRESENTE";
      }

      groups[key].roles.push(exp);
    });

    // Sort roles inside each company chronologically descending (latest/current on top)
    orderedKeys.forEach((key) => {
      groups[key].roles.sort((a, b) => {
        if (a.current && !b.current) return -1;
        if (!a.current && b.current) return 1;
        const dateA = a.start_date ? new Date(a.start_date).getTime() : 0;
        const dateB = b.start_date ? new Date(b.start_date).getTime() : 0;
        return dateB - dateA;
      });
    });

    return orderedKeys.map((key) => groups[key]);
  }, [experiences]);

  return (
    <section 
      id="scene-experience" 
      ref={ref}
      className="relative min-h-screen px-3 sm:px-6 md:px-12 py-12 sm:py-24"
    >
      <div className="w-full max-w-5xl mx-auto space-y-10 sm:space-y-12">
        
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
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Experiência Profissional
          </h2>
          <p className="text-xs sm:text-sm text-[#F9E6C1]/80 max-w-xl mt-1">
            Atuação em desenvolvimento corporativo, sistemas ERP e indústria sucroalcooleira.
          </p>
        </div>

        {/* ── Visual Journey / Mountain Trail Timeline (Flex-aligned layout) ── */}
        <div className="relative space-y-8 sm:space-y-12">
          {companyGroups.map((group, index) => {
            const hasMultipleRoles = group.roles.length > 1;

            return (
              <motion.div
                key={group.company || index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex items-start gap-4 sm:gap-7 group"
              >
                {/* ── Main Trail Column: Node & Connecting Line Perfectly Aligned ── */}
                <div className="flex flex-col items-center self-stretch shrink-0 w-5 sm:w-6 pt-6">
                  {/* Main Trail Milestone Node */}
                  <div className="w-5 h-5 rounded-full bg-[#22051F] border-2 border-[#F59879] flex items-center justify-center shadow-[0_0_14px_rgba(245,152,121,0.6)] shrink-0 z-10 group-hover:scale-125 transition-transform duration-300">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        group.isCurrent ? "bg-[#F59879] animate-pulse" : "bg-[#F9E6C1]"
                      }`}
                    />
                  </div>
                  {/* Connecting Line to next company milestone */}
                  {index < companyGroups.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-[#F59879] via-[#D65F67]/60 to-[#4A1739]/40 my-2" />
                  )}
                </div>

                {/* ── Company Card with Generous Padding ── */}
                <div className="flex-1 rounded-[24px] sm:rounded-[32px] bg-gradient-to-br from-[#280624] to-[#1C031A] border border-[#F59879]/30 hover:border-[#F59879] p-6 sm:p-9 pb-8 sm:pb-11 transition-all duration-300 shadow-[0_15px_45px_rgba(20,2,19,0.3)]">
                  
                  {/* Company Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F59879]/20">
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      {/* Logo Medallion */}
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-2 shrink-0 flex items-center justify-center shadow-md overflow-hidden">
                        <Image
                          src={group.companyLogoUrl}
                          alt={group.company}
                          width={48}
                          height={48}
                          className="object-contain max-h-full"
                        />
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight group-hover:text-[#F9E6C1] transition-colors">
                          {group.company}
                        </h3>
                        <p className="font-mono text-xs text-[#F59879] font-medium flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>
                            {hasMultipleRoles
                              ? `Evolução Profissional · ${group.roles.length} Cargos`
                              : "Atuação Corporativa"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Overall Company Period pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22051F] border border-[#F59879]/30 text-xs font-mono text-[#F9E6C1] shrink-0 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-[#F59879]" />
                      <span>{group.startYear} — {group.endYear}</span>
                    </div>
                  </div>

                  {/* ── Career Evolution Sub-Timeline (Multiple Roles) ── */}
                  {hasMultipleRoles ? (
                    <div className="pt-6 space-y-6">
                      {group.roles.map((role, rIdx) => {
                        const rawLines = role.description
                          ? role.description.split("\n").map((l: string) => l.trim()).filter(Boolean)
                          : [];

                        const isBullets = rawLines.some((l: string) => /^[•\-\*]/.test(l));

                        return (
                          <div key={role.id || rIdx} className="flex items-start gap-3.5 sm:gap-4">
                            {/* Sub-node Column: Dot and Sub-line perfectly aligned */}
                            <div className="flex flex-col items-center self-stretch shrink-0 w-4 pt-1">
                              <div
                                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                                  role.current
                                    ? "bg-[#F59879] border-white shadow-[0_0_8px_rgba(245,152,121,0.8)]"
                                    : "bg-[#22051F] border-[#F59879]/70"
                                }`}
                              >
                                {role.current && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#22051F]" />
                                )}
                              </div>
                              {/* Sub-line to next role */}
                              {rIdx < group.roles.length - 1 && (
                                <div className="w-0.5 flex-1 bg-gradient-to-b from-[#F59879] to-[#D65F67]/40 my-1.5" />
                              )}
                            </div>

                            {/* Role Content Column */}
                            <div className="flex-1 space-y-3 pb-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                                    {role.role}
                                  </h4>
                                  {role.current ? (
                                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#F59879]/20 text-[#F59879] border border-[#F59879]/40 font-semibold flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#F59879] animate-pulse" />
                                      Cargo Atual
                                    </span>
                                  ) : rIdx > 0 ? (
                                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#4A1739]/60 text-[#F9E6C1]/80 border border-[#F59879]/20 flex items-center gap-1">
                                      <TrendingUp className="w-3 h-3 text-[#F59879]" />
                                      Início da Trajetória
                                    </span>
                                  ) : null}
                                </div>

                                <span className="font-mono text-xs text-[#F9E6C1]/75">
                                  {formatDatePeriod(role)}
                                </span>
                              </div>

                              {/* Description: Bullets or Narrative Paragraph */}
                              <div className="space-y-2 pt-1 text-xs sm:text-sm text-[#F9E6C1]/90 leading-relaxed font-sans">
                                {isBullets ? (
                                  rawLines.map((line: string, lIdx: number) => {
                                    const cleanLine = line.replace(/^[•\-\*]\s*/, "");
                                    return (
                                      <div key={lIdx} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#F59879] shrink-0 mt-0.5" />
                                        <span>{cleanLine}</span>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <p className="bg-[#22051F]/40 p-3 sm:p-4 rounded-xl border border-[#F59879]/15">
                                    {role.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* ── Single Role inside Company ── */
                    (() => {
                      const singleRole = group.roles[0];
                      const rawLines = singleRole?.description
                        ? singleRole.description.split("\n").map((l: string) => l.trim()).filter(Boolean)
                        : [];
                      const isBullets = rawLines.some((l: string) => /^[•\-\*]/.test(l));

                      return (
                        <div className="pt-6 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <h4 className="font-display font-bold text-base sm:text-lg text-white">
                              {singleRole?.role}
                            </h4>
                            <span className="font-mono text-xs text-[#F9E6C1]/75">
                              {formatDatePeriod(singleRole)}
                            </span>
                          </div>

                          <div className="space-y-2.5 pt-1 text-xs sm:text-sm text-[#F9E6C1]/90 leading-relaxed font-sans">
                            {isBullets ? (
                              rawLines.map((line: string, lIdx: number) => {
                                const cleanLine = line.replace(/^[•\-\*]\s*/, "");
                                return (
                                  <div key={lIdx} className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-[#F59879] shrink-0 mt-0.5" />
                                    <span>{cleanLine}</span>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="bg-[#22051F]/40 p-3.5 sm:p-4 rounded-xl border border-[#F59879]/15">
                                {singleRole?.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })()
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
