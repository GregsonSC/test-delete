import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Link from 'next/link';
import { HoverCardImagesProps } from "@/components/interface/hover-card-image-interface";

export function HoverCardImage({
    image,
    title,
    content,
    date,
    tag,
    href,
}: HoverCardImagesProps) {
    return (
        <Link href={href}>
            <div className="w-full max-w-[319px] sm:h-full p-[1px] bg-gradient-to-r from-[#99CC33] to-[#33CCCC] rounded-lg">
                <Card className="w-full h-full bg-[#36394b] backdrop-blur-md hover:bg-[#282b38]">
                    <CardHeader className="items-start">
                        <CardTitle>
                            <h4 className="text-xl font-semibold lg:h-[64px] flex items-center">{title}</h4>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-normal mx-2 text-base truncate">{content}</p>
                        <div className="w-full max-w-[249px] sm:h-[137px] mx-auto mt-4">
                            <img
                                src={image}
                                alt="icon"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <hr className="w-60 hover:w-60 transition-all duration-300 mx-auto border-t border-[#E4E4E7] mb-2" />
                        <div className="flex flex-row items-center justify-between w-full px-4">
                            <div className="flex-1">
                                <p className="mt-5 text-left">{date}</p>
                            </div>
                            <div className="flex-1">
                                <p className="mt-5 text-right">{tag}</p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Link>
    );
}
