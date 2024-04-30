import { cn } from "@/lib/utils";

function Title({ title, color = "primary" }: { title: string; color?: "base" | "primary" }) {
  return (
    <p
      className={cn("text-2xl text-primary font-bold", {
        "text-primary": color === "primary",
        "text-primary-foreground": color === "base",
      })}
    >
      {title}
    </p>
  );
}

export default Title;
