import { Button as ShadcnButton } from "@/components/ui/button";
import type { ButtonProps } from "./button-types";

export function Button({ children, variant = "default", size = "default", ...props }: ButtonProps) {
  return (
    <ShadcnButton variant={variant} size={size} {...props}>
      {children}
    </ShadcnButton>
  );
}
