"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

interface ForestLayerProps {
  mouseXOffset?: number;
}

export function ForestLayer({ mouseXOffset = 0 }: ForestLayerProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      {/* ── 1. Distant Forest Ridge / Tree Canopy (Terracotta Wine) ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pointer-events-none h-[48%] overflow-hidden rounded-[inherit]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: mouseXOffset * -12,
              }
        }
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Jagged tree tops in distant haze */}
          <path
            d="M0 160 
               L20 152 L40 160 L60 148 L80 158 L110 145 L140 155 L170 142 L200 154 L230 140 L260 152 L290 138 L320 150
               L360 135 L400 148 L440 136 L480 146 L520 134 L560 144 L600 130 L640 142 L680 128 L720 140 L760 126
               L800 138 L840 124 L880 136 L920 122 L960 134 L1000 125 L1040 138 L1080 128 L1120 140 L1160 130
               L1200 142 L1240 134 L1280 145 L1320 136 L1360 148 L1400 138 L1440 145 L1440 400 L0 400 Z"
            fill="#8C2C50"
            fillOpacity="0.85"
          />
        </svg>
      </motion.div>

      {/* ── 2. Midground Forest (Rich Wine #4A1739) ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pointer-events-none h-[42%] overflow-hidden rounded-[inherit]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: mouseXOffset * -18,
              }
        }
        transition={{ type: "spring", stiffness: 45, damping: 20 }}
      >
        <svg
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Distinct Pine Spire Layer */}
          <path
            d="M0 120 
               L15 80 L22 105 L30 70 L38 98 L50 60 L62 95 L75 50 L88 92 L105 55 L120 95 L140 65 L160 100
               L185 55 L205 92 L225 45 L245 88 L270 58 L295 95 L320 62 L345 98 L375 50 L400 90 L430 65 L455 100
               L485 55 L515 92 L545 68 L575 105 L610 60 L640 95 L675 72 L705 105 L740 65 L770 98 L805 58 L835 92
               L870 68 L900 102 L935 55 L965 92 L1000 65 L1030 98 L1065 52 L1095 90 L1130 62 L1160 96 L1195 58
               L1225 94 L1260 68 L1290 102 L1325 55 L1355 92 L1390 60 L1420 95 L1440 70 L1440 360 L0 360 Z"
            fill="#4A1739"
          />
        </svg>
      </motion.div>

      {/* ── 3. Foreground Dense Forest (Deep Obsidian Wine #22051F) ── */}
      <motion.div
        className="absolute inset-x-0 bottom-0 pointer-events-none h-[34%] overflow-hidden rounded-[inherit]"
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: mouseXOffset * -24,
              }
        }
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      >
        <svg
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_-8px_16px_rgba(20,2,19,0.3)]"
        >
          {/* Prominent Foreground Pine Silhouette with Individual Detailed Trees */}
          <path
            d="M0 60
               L12 18 L18 38 L25 10 L32 35 L40 5 L48 32 L58 12 L66 38 L78 2 L88 35 L100 18 L112 45
               L128 8 L138 38 L152 20 L165 48 L180 15 L195 42 L212 5 L225 36 L240 18 L256 46 L275 8
               L290 38 L310 22 L328 50 L350 12 L368 42 L390 20 L410 48 L435 15 L455 42 L480 25 L505 52
               L530 18 L552 45 L580 22 L605 50 L635 15 L660 45 L690 28 L720 54 L750 20 L778 48 L810 18
               L838 46 L870 24 L900 52 L930 15 L958 44 L990 20 L1020 48 L1050 12 L1078 42 L1110 22 L1140 50
               L1170 16 L1200 45 L1230 20 L1260 48 L1290 10 L1320 42 L1350 18 L1380 46 L1410 8 L1440 38
               L1440 300 L0 300 Z"
            fill="#22051F"
          />

          {/* Deep Base Shadow Overlay along very bottom for text legibility */}
          <rect x="0" y="200" width="1440" height="100" fill="#1C0319" />
        </svg>
      </motion.div>
    </>
  );
}
