import { cn } from "@/lib/utils";

interface RequestCardProps {
    requestName: string;
    leadStatus: string;
    className?: string;
    isSelected?: boolean; // <-- Add this line
}

export function RequestCard({ requestName, leadStatus, className, isSelected }: RequestCardProps) {
    return (
        <div className={cn(
            "relative p-[3px] rounded-lg overflow-hidden group",
            "bg-gradient-to-r from-[#99CC33] to-[#66CCCC]",
            className
        )}>
            <div className={cn(
                "flex items-center justify-between p-4 rounded-[5px]",
                "bg-white",
                // Only apply hover effect if not selected
                !isSelected && "group-hover:bg-gradient-to-r group-hover:from-[#E6F5CC] group-hover:to-[#D9F5F5]",
                isSelected && "bg-gradient-to-r from-[#E6F5CC] to-[#D9F5F5]"
            )}>
                <span className="text-base font-semibold text-[#2C3E50]">
                    {requestName}
                </span>
                <span className="px-4 py-1 bg-[#2C3E50] text-white text-sm rounded-full">
                    {leadStatus}
                </span>
            </div>
        </div>
    );
}