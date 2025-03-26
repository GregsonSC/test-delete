import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,  

  } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowRight } from "lucide-react";
import { HoverCardImagesProps } from "@/components/interface/hover-card-image-interface";


export function HoverCardImage({ image, title, content, date, tag }: HoverCardImagesProps) {
    return (
        <Card className="w-80 bg-[#36394b5d] backdrop-blur-md border-[#99CC33]">
            <CardHeader className="items-start">
                <CardTitle className="p-0">
                    <h4 className="text-xl font-semibold">{title}</h4>
                </CardTitle>
            </CardHeader>
            <CardContent >
                <p className="font-normal text-base">{content}</p>
                <img src={image} alt="icon" className="rounded-3xl mt-7" />
            </CardContent>
            <CardFooter className=" flex flex-col">
                <hr className="w-11/12 mx-auto border-t border-[#E4E4E7] pb-2" />
                <div className="flex gap-28 items-center">
                    <p className="mt-5">{date}</p>
                    <p className="mt-5">{tag}</p>
                </div>
            </CardFooter>
        </Card>
    );
}
