"use client";

import React, { useRef, useCallback } from "react";
import { useMotionValue, useSpring } from "motion/react";
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

export function Landscape({ children, className = "" }: LandscapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance MotionValue: Updates CSS transform directly without React re-renders!
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 45, damping: 25, mass: 0.4 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normalized = (x / rect.width - 0.5) * 2; // -1 to 1
    mouseX.set(normalized);
  }, [mouseX]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
  }, [mouseX]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full overflow-visible ${className}`}
    >
      {/* ── Outer Layers Breaking Boundaries (Visible on tablet/desktop) ── */}
      <div className="hidden sm:block pointer-events-none">
        <CloudLayer smoothMouseX={smoothMouseX} />
        <BirdsLayer smoothMouseX={smoothMouseX} />
      </div>

      {/* ── Desktop Framed Poster vs Mobile Full-Bleed Immersive View ── */}
      <div className="relative w-full min-h-[100dvh] sm:min-h-[600px] sm:aspect-[16/10] md:aspect-[16/9] max-h-[860px] rounded-none sm:rounded-[40px] md:rounded-[48px] overflow-hidden shadow-none sm:shadow-[0_30px_90px_rgba(34,5,31,0.25)] border-0 sm:border sm:border-[#F59879]/30 transform-gpu">
        {/* Layer 1: Sky & Sun */}
        <SkyLayer />

        {/* Layer 2: Mountain Ridges */}
        <MountainLayer smoothMouseX={smoothMouseX} />

        {/* Layer 3: Forest Layers */}
        <ForestLayer smoothMouseX={smoothMouseX} />

        {/* Layer 4: Foreground Content & UI */}
        <div className="relative z-30 w-full h-full min-h-[100dvh] sm:min-h-0 flex flex-col justify-between p-5 pt-8 pb-8 sm:p-10 md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
