import { cn } from "@/lib/utils";

function Title({
  title,
  color = "primary",
  isCenter = false,
}: {
  title: string;
  color?: "base" | "primary" | "dark";
  isCenter?: boolean;
}) {
  return (
    <h2
      className={cn("text-2xl text-primary font-bold", {
        "text-primary": color === "primary",
        "text-primary-foreground": color === "base",
        "text-foreground": color === "dark",
        "text-center": isCenter,
      })}
    >
      {title}
    </h2>
  );
}

export default Title;
