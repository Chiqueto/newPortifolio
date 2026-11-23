"use client";

import React from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";

interface MountainLayerProps {
  smoothMouseX?: MotionValue<number>;
}

export function MountainLayer({ smoothMouseX }: MountainLayerProps) {
  const shouldReduceMotion = useReducedMotion();
  const x = useTransform(smoothMouseX ?? { get: () => 0 } as any, [-1, 1], [8, -8]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] will-change-transform"
      style={shouldReduceMotion || !smoothMouseX ? undefined : { x }}
    >
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* ── 1. Distant Mountain Ridge (Hazy Pink/Coral) ── */}
        <path
          d="M0 450 L120 400 L250 430 L380 370 L520 420 L680 360 L850 410 L1020 350 L1180 390 L1340 330 L1440 360 L1440 800 L0 800 Z"
          fill="#E88A78"
          fillOpacity="0.45"
        />

        {/* ── 2. Prominent Left Majestic Peak ── */}
        {/* Peak Lit Face (Facing Sun / Left slope) */}
        <polygon
          points="220,180 60,490 280,520"
          fill="#F5947B"
        />
        {/* Peak Shadow Face (Ridge side) */}
        <polygon
          points="220,180 280,520 420,490"
          fill="#DE6E72"
        />
        {/* Facet Highlights / Detail ridges on peak */}
        <polygon
          points="220,180 160,330 200,370"
          fill="#FCA78F"
        />
        <polygon
          points="200,370 170,470 250,510"
          fill="#D46067"
        />
        <polygon
          points="220,180 260,320 280,520"
          fill="#C44E5E"
        />

        {/* ── 3. Midground Mountain Ridge & Slopes ── */}
        {/* Left shoulder descent */}
        <path
          d="M0 460 Q110 430 260 470 T540 450 L540 800 L0 800 Z"
          fill="#D6606A"
          fillOpacity="0.85"
        />

        {/* Center / Right Warm Ridges */}
        <polygon
          points="720,290 540,510 880,520"
          fill="#DE7074"
        />
        <polygon
          points="720,290 880,520 1020,490"
          fill="#C65264"
        />

        {/* Soft rolling hills below mountains */}
        <path
          d="M0 500 C200 480 380 540 600 510 C820 480 1100 530 1440 490 L1440 800 L0 800 Z"
          fill="#B54460"
          fillOpacity="0.7"
        />
      </svg>
    </motion.div>
  );
}
