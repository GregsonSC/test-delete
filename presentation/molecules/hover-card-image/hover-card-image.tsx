import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,  

  } from "@/components/ui/card"
import Link from 'next/link'
import { HoverCardImagesProps } from "@/components/interface/hover-card-image-interface";


export function HoverCardImage({ image, title, content, date, tag, href }: HoverCardImagesProps) {
    return (
            <Link href={href}>
    <div className="w-[319px] h-[372px] p-[1px] bg-gradient-to-r from-[#99CC33] to-[#33CCCC] rounded-lg">
        <Card className="w-full h-full bg-[#36394b] backdrop-blur-md hover:bg-[#282b38]">
        <CardHeader className="items-start">
            <CardTitle >
            <h4 className="text-xl font-semibold">{title}</h4>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="font-normal mx-2 text-base truncate">{content}</p>
            <div className="w-[249px] h-[137px] mx-auto">
            <img 
                src={image} 
                alt="icon" 
                className="w-full h-full rounded-lg mt-4" 
            />
            </div>
        </CardContent>
        <CardFooter className=" flex flex-col">
                    <hr className="w-11/12 mx-auto border-t border-[#E4E4E7] mb-2" />
                    <div className="flex flex-row items-center">
                        <div className="flex justify-start mr-9"><p className="mt-5">{date}</p></div>
                        <div className="flex justify-end ml-9"><p className="mt-5">{tag}</p></div>
                    </div>
                </CardFooter>
        </Card>
    </div>
    </Link>

    );
}
