import { cn } from "@/lib/utils";
import type { HeadingProps } from "./heading-types";

export function Heading({ level = "h2", children, className, ...props }: HeadingProps) {
  const Component = level;

  const styles = cn(
    "font-bold",
    level === "h1" && "text-4xl md:text-5xl lg:text-6xl",
    level === "h2" && "text-3xl md:text-4xl",
    level === "h3" && "text-2xl md:text-3xl",
    level === "h4" && "text-xl md:text-2xl",
    level === "h5" && "text-lg md:text-xl",
    level === "h6" && "text-base md:text-lg",
    className
  );

  return (
    <Component className={styles} {...props}>
      {children}
    </Component>
  );
}
