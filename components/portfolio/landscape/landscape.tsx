"use client";

import React, { useRef, useState, useCallback } from "react";
import { SkyLayer } from "./sky-layer";
import { CloudLayer } from "./cloud-layer";
import { MountainLayer } from "./mountain-layer";
import { ForestLayer } from "./forest-layer";
import { BirdsLayer } from "./birds-layer";

interface LandscapeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: "sunset" | "afternoon" | "dusk";
}

export function Landscape({ children, className = "", variant = "sunset" }: LandscapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseXOffset, setMouseXOffset] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalized = (x / rect.width - 0.5) * 2; // -1 to 1
    setMouseXOffset(normalized);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseXOffset(0);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-visible transition-colors duration-700 ${className}`}
    >
      {/* ── Outer Layers Breaking Boundaries (Visible on tablet/desktop) ── */}
      <div className="hidden sm:block">
        <CloudLayer mouseXOffset={mouseXOffset} />
        <BirdsLayer mouseXOffset={mouseXOffset} />
      </div>

      {/* ── Desktop Framed Poster vs Mobile Full-Bleed Immersive View ── */}
      <div className="relative w-full min-h-[100dvh] sm:min-h-[600px] sm:aspect-[16/10] md:aspect-[16/9] max-h-[860px] rounded-none sm:rounded-[40px] md:rounded-[48px] overflow-hidden shadow-none sm:shadow-[0_30px_90px_rgba(34,5,31,0.25)] border-0 sm:border sm:border-[#F59879]/30">
        {/* Layer 1: Sky & Sun */}
        <SkyLayer />

        {/* Layer 2: Mountain Ridges */}
        <MountainLayer mouseXOffset={mouseXOffset} />

        {/* Layer 3: Forest Layers */}
        <ForestLayer mouseXOffset={mouseXOffset} />

        {/* Layer 4: Foreground Content & UI */}
        <div className="relative z-30 w-full h-full min-h-[100dvh] sm:min-h-0 flex flex-col justify-between p-5 pt-8 pb-8 sm:p-10 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
