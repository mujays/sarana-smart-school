"use client";

import AppPadding from "@/components/shared/app-padding";
import Title from "@/components/shared/title";
import { cn } from "@/lib/utils";
import * as React from "react";
import { motion } from "framer-motion";
import { opacityAnimation } from "@/components/shared/animate/reveal";

function SectionAbout({ children, title, withBackground = false }: { children: React.ReactNode; title: string; withBackground?: boolean }) {
  return (
    <section
      className={cn({
        "bg-accent text-accent-foreground": withBackground,
      })}
    >
      <AppPadding className={cn("flex flex-col gap-10 md:gap-0 md:flex-row items-center py-10 md:py-[7rem]")}>
        <motion.div variants={opacityAnimation} initial="hidden" viewport={{ once: true }} whileInView="visible" className="basis-1/3">
          <Title title={title} color={withBackground ? "base" : "primary"} />
        </motion.div>
        <motion.div variants={opacityAnimation} initial="hidden" viewport={{ once: true }} whileInView="visible" className="basis-2/3 text-justify space-y-5">
          {children}
        </motion.div>
      </AppPadding>
    </section>
  );
}

export default SectionAbout;
