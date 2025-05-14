import { cn } from "@/lib/utils";

interface RequestCardProps {
  requestName: string;
  leadStatus: string;
  className?: string;
  isSelected?: boolean;
}

export function RequestCard({ requestName, leadStatus, className, isSelected }: RequestCardProps) {
  return (
    <div
      className={cn(
        "relative p-[2px] rounded-md overflow-hidden group",
        "bg-gradient-to-r from-[#99CC33] to-[#2EBAC6]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 py-3 rounded-md w-full h-full transition-colors duration-200",
          isSelected ? "bg-[#10132a]/80" : "bg-white/20"
        )}
      >
        <span className="text-[#23244a] font-semibold text-[18px]">{requestName}</span>
        <span className="px-4 py-1 bg-[#0B0E1C] text-white text-sm rounded-full font-medium shadow-sm">
          {leadStatus}
        </span>
      </div>
    </div>
  );
}
