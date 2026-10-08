"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface BirdsLayerProps {
  mouseXOffset?: number;
}

export function BirdsLayer({ mouseXOffset = 0 }: BirdsLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* ── 1. The Iconic Large Soaring Bird (Escapes Top Right Frame Edge) ── */}
      <motion.div
        className="absolute -top-12 -right-6 sm:-top-16 sm:-right-8 md:-top-20 md:-right-12 z-40 pointer-events-none w-[130px] sm:w-[170px] md:w-[210px]"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : {
                opacity: 1,
                y: [0, -8, 0],
                x: mouseXOffset * -25,
                rotate: [0, -1.5, 0],
              }
        }
        transition={{
          opacity: { duration: 0.9 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          x: { type: "spring", stiffness: 40, damping: 20 },
          rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_12px_24px_rgba(20,2,19,0.35)]"
        >
          {/* Detailed Soaring Falcon/Hawk Silhouette */}
          <path
            d="M210 20 C200 45 185 70 170 92 C158 80 148 68 135 55 C142 75 145 95 142 115 C132 108 120 100 105 92 C115 105 120 120 118 135 C108 132 95 128 80 125 C92 135 100 148 102 162 C90 162 75 160 60 160 C75 168 85 178 90 190 C78 195 62 198 45 200 C62 205 78 210 95 210 C108 210 125 195 140 185 C148 198 160 215 175 235 C178 220 175 200 168 185 C185 180 205 170 225 158 C215 152 200 150 188 152 C205 140 222 125 238 108 C222 108 208 112 196 118 C212 98 226 75 238 48 C224 55 212 62 202 72 C210 52 216 32 210 20 Z"
            fill="#22051F"
          />
        </svg>
      </motion.div>

      {/* ── 2. Soaring Bird Across Sun / Midground ── */}
      <motion.div
        className="absolute top-[34%] right-[22%] sm:right-[24%] z-20 pointer-events-none w-[64px] sm:w-[90px]"
        initial={{ opacity: 0, x: -10 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, x: 0 }
            : {
                opacity: 1,
                x: [0, 12, 0],
                y: [0, -4, 0],
              }
        }
        transition={{
          opacity: { duration: 1, delay: 0.3 },
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

      {/* ── 3. Distant Birds in Flight Flocking ── */}
      <motion.div
        className="absolute top-[40%] left-[45%] z-20 pointer-events-none w-[36px] sm:w-[48px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 8, 0],
                y: [0, -3, 0],
              }
        }
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 15 C20 6 10 5 0 8 C10 14 18 17 25 18 C20 22 14 26 8 28 C18 25 25 21 32 17 C38 20 45 23 54 25 C49 21 44 18 40 15 C47 13 54 9 60 4 C49 5 39 8 30 15 Z"
            fill="#380F2B"
          />
        </svg>
      </motion.div>

      {/* Small Bird 4 (Left Horizon) */}
      <motion.div
        className="absolute top-[46%] left-[27%] z-20 pointer-events-none w-[24px] sm:w-[32px]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -2.5, 0],
              }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 15 C20 6 10 5 0 8 C10 14 18 17 25 18 C38 20 45 23 54 25 C49 21 44 18 40 15 C47 13 54 9 60 4 C49 5 39 8 30 15 Z"
            fill="#4A1739"
          />
        </svg>
      </motion.div>

      {/* Small Bird 5 (Center Distance) */}
      <div className="absolute top-[45%] left-[38%] z-20 pointer-events-none w-[18px] sm:w-[24px]">
        <svg viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30 15 C20 6 10 5 0 8 C10 14 18 17 25 18 C38 20 45 23 54 25 C49 21 44 18 40 15 C47 13 54 9 60 4 C49 5 39 8 30 15 Z"
            fill="#4A1739"
          />
        </svg>
      </div>
    </>
  );
}
