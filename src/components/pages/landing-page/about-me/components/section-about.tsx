import AppPadding from "@/components/shared/app-padding";
import Title from "@/components/shared/title";
import { cn } from "@/lib/utils";
import * as React from "react";

function SectionAbout({ children, title, withBackground = false }: { children: React.ReactNode; title: string; withBackground?: boolean }) {
  return (
    <section
      className={cn({
        "bg-accent text-accent-foreground": withBackground,
      })}
    >
      <AppPadding className={cn("flex items-center py-[10rem]")}>
        <div className="basis-1/3">
          <Title title={title} color={withBackground ? "base" : "primary"} />
        </div>
        <div className="basis-2/3 text-justify space-y-5">{children}</div>
      </AppPadding>
    </section>
  );
}

export default SectionAbout;
