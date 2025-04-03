import { toast } from "sonner";
import { Button } from "@/components/ui/button"

export function DefaultSucess() {
  return toast.success("Event has been created");
}