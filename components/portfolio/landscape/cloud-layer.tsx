"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface CloudLayerProps {
  mouseXOffset?: number;
}

export function CloudLayer({ mouseXOffset = 0 }: CloudLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* ── 1. Top Left Volumetric Cloud (Breaks Top Frame Boundary) ── */}
      <motion.div
        className="absolute -top-7 -left-6 sm:-top-10 sm:-left-10 z-20 pointer-events-none w-[280px] sm:w-[420px] md:w-[500px]"
        initial={{ opacity: 0, x: -20 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, x: 0 }
            : {
                opacity: 1,
                x: mouseXOffset * -15,
                y: [0, -3, 0],
              }
        }
        transition={{
          opacity: { duration: 1 },
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <svg
          viewBox="0 0 520 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_8px_16px_rgba(74,23,57,0.12)]"
        >
          {/* Base Shadow Layer */}
          <path
            d="M50 140 H470 C490 140 505 125 505 105 C505 85 490 70 470 70 C465 70 460 72 455 75 C445 45 415 25 380 25 C355 25 330 37 315 57 C305 45 290 38 272 38 C250 38 230 48 220 65 C205 52 185 45 162 45 C130 45 102 65 92 95 C86 92 80 90 72 90 C50 90 32 108 32 130 C32 135 34 140 37 144 Z"
            fill="#F4D9CE"
            fillOpacity="0.8"
          />
          {/* Main White Body */}
          <path
            d="M45 130 H480 C498 130 512 116 512 98 C512 80 498 66 480 66 C474 66 468 68 463 71 C453 43 424 23 390 23 C366 23 342 34 327 53 C317 41 302 34 285 34 C263 34 243 44 233 60 C218 47 198 40 176 40 C145 40 118 60 108 89 C102 86 96 84 88 84 C67 84 50 101 50 122 C50 125 51 128 53 130 Z"
            fill="#FFFFFF"
          />
          {/* Top highlight cap */}
          <path
            d="M120 75 C128 55 150 42 176 42 C196 42 214 49 227 61 C237 46 256 36 278 36 C294 36 308 42 318 53 C332 36 355 25 380 25 C412 25 439 44 449 71 C430 73 390 75 350 78 C280 82 190 85 120 75 Z"
            fill="#FFFAFA"
          />
        </svg>
      </motion.div>

      {/* ── 2. Mid Right Horizontal Cloud (Near Sun) ── */}
      <motion.div
        className="absolute top-[28%] -right-4 sm:top-[26%] sm:-right-8 z-20 pointer-events-none w-[240px] sm:w-[360px] md:w-[440px]"
        initial={{ opacity: 0, x: 20 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1, x: 0 }
            : {
                opacity: 1,
                x: mouseXOffset * 20,
                y: [0, 4, 0],
              }
        }
        transition={{
          opacity: { duration: 1.2, delay: 0.2 },
          x: { type: "spring", stiffness: 45, damping: 20 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
      >
        <svg
          viewBox="0 0 460 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto drop-shadow-[0_6px_14px_rgba(74,23,57,0.1)]"
        >
          {/* Soft Shadow Base */}
          <path
            d="M30 110 H430 C445 110 458 98 458 82 C458 68 447 56 433 55 C425 30 401 12 372 12 C350 12 330 22 318 38 C308 26 293 18 276 18 C256 18 238 28 228 44 C215 35 198 30 180 30 C154 30 131 46 122 70 C116 67 110 65 104 65 C85 65 70 80 70 98 Z"
            fill="#F6DDD3"
            fillOpacity="0.85"
          />
          {/* Main Body */}
          <path
            d="M25 102 H425 C440 102 452 90 452 75 C452 61 441 50 427 49 C419 25 396 8 368 8 C346 8 327 18 315 34 C305 22 290 15 273 15 C253 15 236 25 226 40 C213 32 197 27 180 27 C155 27 133 42 123 65 C118 63 112 61 106 61 C88 61 74 75 74 92 Z"
            fill="#FFFFFF"
          />
          {/* Lobe detail */}
          <ellipse cx="265" cy="40" rx="36" ry="20" fill="#FFFFFF" />
          <ellipse cx="365" cy="35" rx="50" ry="24" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* ── 3. High Floating Feather Cloud Wisp ── */}
      <motion.div
        className="absolute top-[16%] left-[22%] sm:left-[26%] z-10 pointer-events-none w-[140px] sm:w-[220px] opacity-75"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 8, 0],
              }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 240 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 32 C40 32 60 20 85 20 C115 20 130 30 160 30 C195 30 215 18 235 22 C220 28 200 36 170 36 C135 36 120 27 90 27 C60 27 40 38 10 32 Z"
            fill="#FFFFFF"
            fillOpacity="0.7"
          />
        </svg>
      </motion.div>
    </>
  );
}
