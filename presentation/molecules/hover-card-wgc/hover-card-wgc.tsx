import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HoverCardWGCProps } from "@/components/interface/hover-card-wgc-interface";

export function HoverCardWGC({
    icon,
    title,
    content,
    link,
    style,
}: HoverCardWGCProps & { style?: React.CSSProperties }) {
    return (
        <Card
            className="w-80 rounded-lg bg-[#36394B] backdrop-blur-md border-[#99CC33]"
            style={style}
        >
            <CardHeader className="items-start">
                <img src={icon} alt="icon" className="w-14 h-14 mb-5 rounded-lg" />
                <CardTitle className="mb-5">
                    <h4 className="text-xl font-semibold">{title}</h4>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="font-normal text-base">{content}</p>
            </CardContent>
            <CardFooter className="flex flex-col h-auto">
                <hr className="w-11/12 mx-auto border-t border-[#E4E4E7] pb-2" />
                <div className="flex justify-end gap-2 w-full">
                    <Link href={link}>See more</Link>
                    <ArrowRight color="white" />
                </div>
            </CardFooter>
        </Card>
    );
}
