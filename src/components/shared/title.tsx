import { cn } from "@/lib/utils";

function Title({ title, color = "primary", isCenter = false }: { title: string; color?: "base" | "primary" | "dark"; isCenter?: boolean }) {
  return (
    <p
      className={cn("text-2xl text-primary font-bold", {
        "text-primary": color === "primary",
        "text-primary-foreground": color === "base",
        "text-foreground": color === "dark",
        "text-center": isCenter,
      })}
    >
      {title}
    </p>
  );
}

export default Title;
