import { cn } from "@/lib/utils";

interface RequestDetailProps {
    requestName: string;
    associatedService: string;
    companyPlan: string;
    description: string;
    leadStatus: string;
    className?: string;
}

export function RequestDetail({
    requestName,
    associatedService,
    companyPlan,
    description,
    leadStatus,
    className
}: RequestDetailProps) {
    return (
        // Outer container for gradient border
        <div className={cn(
            "relative p-[3px] rounded-lg h-full", // Padding for border, full height
            "bg-gradient-to-r from-[#99CC33] to-[#66CCCC]", // Gradient background
            "max-h-80", // <-- Add your preferred max height here (e.g., max-h-80 for 20rem)
            className
        )}>
            {/* Inner Content Container */}
            <div className={cn(
                "flex flex-col justify-between p-4 rounded-[5px] h-full", // Flex column, padding, rounding, full height
                "bg-white" // White background
            )}>
                {/* Top section with text details */}
                <div className="space-y-2">
                    <h2 className="text-xl font-bold text-[#2C3E50]">
                        {requestName}
                    </h2>
                    <p className="text-base text-gray-700">{associatedService}</p>
                    <p className="text-base text-gray-700">{companyPlan}</p>
                    <p className="text-sm text-gray-500 mt-2">
                        {description}
                    </p>
                </div>

                {/* Bottom section with lead status */}
                <div className="mt-4">
                    <span className="px-4 py-1 bg-[#2C3E50] text-white text-sm rounded-full inline-block">
                        {leadStatus}
                    </span>
                </div>
            </div>
        </div>
    );
}