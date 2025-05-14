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
        "relative p-[2px] rounded-xl overflow-hidden group",
        "bg-gradient-to-r from-[#99CC33] to-[#2EBAC6]",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between px-6 py-3 rounded-[13px]",
          "bg-[#10132a]/80 backdrop-blur-md",
          "w-full h-full",
          isSelected && "ring-2 ring-[#99CC33]"
        )}
      >
        <span className="text-white font-semibold text-[18px]">{requestName}</span>
        <span className="px-4 py-1 bg-[#0B0E1C] text-white text-sm rounded-full font-medium shadow-sm">
          {leadStatus}
        </span>
      </div>
    </div>
  );
}
