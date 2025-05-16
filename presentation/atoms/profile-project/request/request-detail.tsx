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
  className,
}: RequestDetailProps) {
  return (
    // Outer container for gradient border
    <div
      className={cn(
        "relative p-[6px] rounded-lg",
        "bg-gradient-to-r from-[#99CC33] via-[#66CCCC] to-[#99CC33]",
        className
      )}
    >
      {/* Inner Content Container */}
      <div className={cn("flex flex-col justify-between p-4 rounded-md", "bg-[#100e34]")}>
        {/* Top section with text details */}
        <div className="space-y-1">
          <h2 className="text-[30px] font-semibold text-white" style={{ fontWeight: 600 }}>
            {requestName}
          </h2>
          <p className="text-[20px] text-gray-200">{associatedService}</p>
          <p className="text-[20px] text-gray-200">{companyPlan}</p>
          <p className="text-[16px] text-gray-300 mt-1">{description}</p>
        </div>

        {/* Bottom section with lead status */}
        <div className="mt-2">
          <span className="px-4 py-1 bg-[#04081e] text-gray-100 text-sm rounded-full inline-block shadow-sm">
            {leadStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
