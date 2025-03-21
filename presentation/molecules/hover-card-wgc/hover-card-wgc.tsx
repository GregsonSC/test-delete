import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,  

  } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowRight } from "lucide-react";

interface HoverCardWGCProps {
  icon: string;
  title: string;
  content: string;
  link: string;

} 
export function HoverCardWGC({ icon, title, content, link }: HoverCardWGCProps) {
  return (
    <Card className={`w-80 bg-[#36394B] backdrop-blur-md border-[#99CC33]`}>
      <CardHeader className="items-start">
        <img src={icon} alt="icon" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-end gap-2 h-auto">
        <Link href={link}>See more</Link>
        <ArrowRight color="white" />
      </CardFooter>
    </Card>
  );
}