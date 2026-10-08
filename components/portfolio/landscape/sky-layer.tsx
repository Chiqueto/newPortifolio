"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface SkyLayerProps {
  sunScale?: number;
  sunYOffset?: number;
}

export function SkyLayer({ sunScale = 1 }: SkyLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
      {/* Base Sky Sunset Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #F59879 0%, #FAAE8C 28%, #F9C39B 55%, #F9E6C1 100%)",
        }}
      />

      {/* Atmospheric Warm Haze / Radial Depth */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          background: "radial-gradient(ellipse at 70% 45%, #FFF2D4 0%, transparent 60%)",
        }}
      />

      {/* Radiant Setting Sun */}
      <motion.div
        className="absolute top-[24%] sm:top-[32%] right-[16%] sm:right-[26%] -translate-y-1/2 flex items-center justify-center pointer-events-none"
        initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1 * sunScale, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Outer Aura */}
        <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-[#FFF5DC]/30 blur-2xl pointer-events-none" />
        
        {/* Mid Halo */}
        <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-[#FFEAC0]/40 blur-lg pointer-events-none" />
        
        {/* Core Glowing Sun Disc */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#FFFDF5] via-[#FFF3D6] to-[#FFE6AD] shadow-[0_0_50px_rgba(255,243,214,0.6)]" />
      </motion.div>
    </div>
  );
}
