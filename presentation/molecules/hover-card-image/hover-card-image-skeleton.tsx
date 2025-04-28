"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export function HoverCardImageSkeleton() {
  return (
    <div className="w-full max-w-[400px] sm:h-full p-[1px] bg-gradient-to-r from-[#99CC33] to-[#33CCCC] rounded-lg animate-pulse">
      <Card className="w-full h-full bg-[#36394b] backdrop-blur-md">
        <CardHeader className="items-start">
          <CardTitle>
            <div className="h-7 bg-gray-400/40 rounded w-3/4 mb-2" />
          </CardTitle>
          <div className="h-4 bg-gray-400/30 rounded w-1/2 mb-1" />
        </CardHeader>
        <CardContent>
          <div className="h-24 bg-gray-400/20 rounded w-full mb-2" />
        </CardContent>
        <CardFooter>
          <div className="flex flex-row items-center justify-between w-full px-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-400/20 rounded w-1/2 mt-5" />
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-400/20 rounded w-1/2 mt-5 ml-auto" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
