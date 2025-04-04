import { title } from "process";
import { toast } from "sonner";
import { ToastTitle, ToastDescription } from "@/components/ui/toast";
import { Star } from 'lucide-react';

interface CustomToastProps {
  title: string;
  description: string;
}

export const DefaultToast = {
  toastOptions: {
    style: {
      background: "#04081E",
      color:"white",
      fontWeight:"400"
    
    },
  },
  normal: (message: string) => {
    return toast(message,DefaultToast.toastOptions);
  },
  title: (TitleToast: string, message: string) => {
    return toast(TitleToast, { ...DefaultToast.toastOptions, description: message });
  },
  normalStart: (message: string) => {
    return toast(message, {
      ...DefaultToast.toastOptions,
      icon: <Star color="white" className="w-5 h-5" />,
    });
  },
  titleStart: (TitleToast: string, message: string) => {
    return toast(TitleToast, {
      ...DefaultToast.toastOptions,
      description: message,
      icon: <Star color="white" className="w-5 h-5" />,
    });
  }
};