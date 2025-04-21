"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoogleReviewCardProps } from "@/components/interface/review-card-interface";


export function GoogleReviewCard({
    rating = 5.0,
    totalReviews = 25,
}: GoogleReviewCardProps) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border border-[#99CC33] rounded-md xl:w-[992px] xl:h-[112px] bg-white/95 hover:bg-white/80">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-start items-center">
                    <img src="/iconos_2/google.png" alt="Google" className="w-9 h-9" />
                    <h3 className="font-semibold text-black text-center text-2xl ml-4">
                        Excellent on Google
                    </h3>
                </div>
                <div className="flex items-center ">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            fill="black"
                            stroke="black"
                            className="h-6 w-6"
                        />
                    ))}
                    <p className="text-lg font-normal text-black ml-2">
                        {rating.toFixed(1)} out of 5 based on {totalReviews} reviews
                    </p>
                </div>
            </div>
            <a
                href="https://search.google.com/local/writereview?placeid=ChIJqxUQgZUF2YgRiuQT1s2z6b4"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Button className="bg-[#99CC33] text-black hover:bg-[#85b92d] rounded-full">
                    Review us on Google
                </Button>
            </a>
        </div>
    );
}
