import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,  

  } from "@/components/ui/card"
import Link from 'next/link'
import { ArrowRight } from "lucide-react";

interface HoverCardImagesProps {
  image: string;
  title: string;
  content: string;
  date: string;
  tag: string;

} 

export function HoverCardImage({ image, title, content, date, tag }: HoverCardImagesProps) {

  return(
    <Card className={`w-80 bg-[#36394b5d] backdrop-blur-md border-[#99CC33]`}>
      <CardHeader className="items-start">
        <CardTitle>
          {title}
          </CardTitle>
      </CardHeader>
      <CardContent>
        {content}
        <img src={image} alt="icon" />
        </CardContent>
      <CardFooter className="flex  h-auto gap-32">
        <p>{date}</p>
        <p>{tag}</p>
      </CardFooter>
    </Card>
  )
}