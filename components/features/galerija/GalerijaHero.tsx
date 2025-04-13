"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import VideoAddModal from "./VideoAddModal";

export function GalerijaHero() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Unesi novu video vežbu u sistem
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          nakon toga je dodaj klijentu.
        </div>
        <VideoAddModal />
      </motion.div>
    </AuroraBackground>
  );
}
