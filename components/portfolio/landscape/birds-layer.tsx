"use client";

import React from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";

interface BirdsLayerProps {
  smoothMouseX?: MotionValue<number>;
}

export function BirdsLayer({ smoothMouseX }: BirdsLayerProps) {
  const shouldReduceMotion = useReducedMotion();
  const dummyValue = { get: () => 0 } as any;

  const xHawk = useTransform(smoothMouseX ?? dummyValue, [-1, 1], [25, -25]);

  return (
    <>
      {/* ── 1. The Iconic Large Soaring Bird (Escapes Top Right Frame Edge on sm+) ── */}
      <motion.div
        className="hidden sm:block absolute -top-12 -right-6 sm:-top-16 sm:-right-8 md:-top-20 md:-right-12 z-40 pointer-events-none w-[130px] sm:w-[170px] md:w-[210px] will-change-transform"
        style={shouldReduceMotion || !smoothMouseX ? undefined : { x: xHawk }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                y: [0, -8, 0],
                rotate: [0, -1.5, 0],
              }
        }
        transition={{
          opacity: { duration: 0.8 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_12px_24px_rgba(20,2,19,0.35)]"
        >
          <path
            d="M210 20 C200 45 185 70 170 92 C158 80 148 68 135 55 C142 75 145 95 142 115 C132 108 120 100 105 92 C115 105 120 120 118 135 C108 132 95 128 80 125 C92 135 100 148 102 162 C90 162 75 160 60 160 C75 168 85 178 90 190 C78 195 62 198 45 200 C62 205 78 210 95 210 C108 210 125 195 140 185 C148 198 160 215 175 235 C178 220 175 200 168 185 C185 180 205 170 225 158 C215 152 200 150 188 152 C205 140 222 125 238 108 C222 108 208 112 196 118 C212 98 226 75 238 48 C224 55 212 62 202 72 C210 52 216 32 210 20 Z"
            fill="#22051F"
          />
        </svg>
      </motion.div>

      {/* ── 2. Soaring Bird Across Sun / Midground ── */}
      <motion.div
        className="absolute top-[34%] right-[22%] sm:right-[24%] z-20 pointer-events-none w-[64px] sm:w-[90px]"
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : {
                opacity: 1,
                x: [0, 12, 0],
                y: [0, -4, 0],
              }
        }
        transition={{
          opacity: { duration: 0.8 },
          x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60 30 C45 15 25 12 0 16 C20 26 38 32 52 35 C42 42 30 52 18 58 C38 52 52 44 64 36 C75 42 90 48 108 52 C98 44 88 38 80 32 C95 28 110 20 120 10 C98 12 78 18 60 30 Z"
            fill="#260621"
          />
        </svg>
      </motion.div>
    </>
  );
}
